import "server-only";

import { prisma } from "./db";
import { notFound, redirect } from "next/navigation";
import { auth } from "./auth";
import { headers } from "next/headers";

// Re-export types and utils from course-utils for convenience
export {
  type PublicCourse,
  type PublicLesson,
  type PublicSession,
  type LessonProgressRecord,
  calculateCourseProgress,
  flattenLessons,
  findNextLesson,
  getLessonById,
  getLessonPosition,
  getPreviousLessonId,
  getNextLessonId,
} from "./course-utils";

/**
 * Get the current authenticated user session
 */
export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

/**
 * Require authentication and return user session
 * Redirects to login if not authenticated
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}

/**
 * Get a published course with all sessions and lessons
 * For public course viewing
 */
export async function getPublicCourse(courseId: string) {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      title: true,
      description: true,
      smallDescription: true,
      fileKey: true,
      price: true,
      duration: true,
      level: true,
      category: true,
      slug: true,
      courseSessions: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          title: true,
          description: true,
          order: true,
          lessons: {
            orderBy: { order: "asc" },
            select: {
              id: true,
              title: true,
              type: true,
              duration: true,
              order: true,
              content: true,
              thumbnailKey: true,
              videoKey: true,
            },
          },
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  return course;
}

/**
 * Get user's enrollment for a course
 */
export async function getEnrollment(courseId: string, userId: string) {
  return await prisma.courseEnrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });
}

/**
 * Get all lesson progress for a user in a course
 */
export async function getLessonProgressForCourse(
  courseId: string,
  userId: string
) {
  // Get all lessons in the course first
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      courseSessions: {
        select: {
          lessons: {
            select: { id: true },
          },
        },
      },
    },
  });

  if (!course) return [];

  const lessonIds = course.courseSessions.flatMap((session) =>
    session.lessons.map((lesson) => lesson.id)
  );

  return await prisma.lessonProgress.findMany({
    where: {
      userId,
      lessonId: { in: lessonIds },
    },
  });
}

/**
 * Auto-enroll user in a free course
 * Returns the enrollment if successful, null if course is not free
 */
export async function autoEnrollIfFree(courseId: string, userId: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { price: true },
  });

  if (!course) return null;

  // Only auto-enroll for free courses (price = 0 or null)
  if (course.price > 0) return null;

  // Check if already enrolled
  const existingEnrollment = await prisma.courseEnrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  if (existingEnrollment) return existingEnrollment;

  // Create enrollment
  return await prisma.courseEnrollment.create({
    data: {
      userId,
      courseId,
    },
  });
}
