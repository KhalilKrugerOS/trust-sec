"use server";

import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/course-data";
import { revalidatePath } from "next/cache";

const COMPLETION_THRESHOLD = 0.9; // 90% threshold

/**
 * Update lesson progress (video playback position)
 */
export async function updateLessonProgress(
  lessonId: string,
  progressSeconds: number
) {
  const session = await requireAuth();
  const userId = session.user.id;

  await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
    update: {
      progressSeconds,
    },
    create: {
      userId,
      lessonId,
      progressSeconds,
    },
  });

  return { success: true };
}

/**
 * Mark a lesson as complete
 */
export async function markLessonComplete(lessonId: string, courseId: string) {
  const session = await requireAuth();
  const userId = session.user.id;

  await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
    update: {
      completed: true,
      completedAt: new Date(),
    },
    create: {
      userId,
      lessonId,
      completed: true,
      completedAt: new Date(),
    },
  });

  // Check if all lessons in course are complete
  await checkAndUpdateCourseCompletion(courseId, userId);

  revalidatePath(`/courses/${courseId}/learn`);

  return { success: true };
}

/**
 * Check if video has passed completion threshold
 */
export async function checkVideoCompletion(
  lessonId: string,
  courseId: string,
  currentSeconds: number,
  totalDuration: number
) {
  if (totalDuration <= 0) return { completed: false };

  const percentWatched = currentSeconds / totalDuration;

  if (percentWatched >= COMPLETION_THRESHOLD) {
    await markLessonComplete(lessonId, courseId);
    return { completed: true };
  }

  return { completed: false };
}

/**
 * Check if all lessons are complete and mark course as complete
 */
async function checkAndUpdateCourseCompletion(
  courseId: string,
  userId: string
) {
  // Get all lessons in the course
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

  if (!course) return;

  const lessonIds = course.courseSessions.flatMap((session) =>
    session.lessons.map((lesson) => lesson.id)
  );

  const totalLessons = lessonIds.length;
  if (totalLessons === 0) return;

  // Count completed lessons
  const completedCount = await prisma.lessonProgress.count({
    where: {
      userId,
      lessonId: { in: lessonIds },
      completed: true,
    },
  });

  // If all lessons are complete, mark course enrollment as complete
  if (completedCount === totalLessons) {
    await prisma.courseEnrollment.update({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      data: {
        completedAt: new Date(),
      },
    });
  }
}

/**
 * Get lesson progress for resuming video
 */
export async function getLessonProgress(lessonId: string) {
  const session = await requireAuth();
  const userId = session.user.id;

  const progress = await prisma.lessonProgress.findUnique({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
  });

  return {
    progressSeconds: progress?.progressSeconds ?? 0,
    completed: progress?.completed ?? false,
  };
}
