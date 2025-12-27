import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import {
  getPublicCourse,
  getSession,
  getEnrollment,
  getLessonProgressForCourse,
  autoEnrollIfFree,
  flattenLessons,
  findNextLesson,
  getLessonById,
} from "@/lib/course-data";
import { CourseLearningPage } from "./_components/CourseLearningPage";
import { LearnPageSkeleton } from "./_components/LearnPageSkeleton";

interface PageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ lesson?: string }>;
}

export default async function LearnPage({ params, searchParams }: PageProps) {
  const { courseId } = await params;
  const { lesson: lessonIdParam } = await searchParams;

  // Get user session
  const session = await getSession();
  if (!session) {
    redirect(`/login?redirect=/courses/${courseId}/learn`);
  }

  const userId = session.user.id;

  // Get course data
  const course = await getPublicCourse(courseId);
  if (!course) {
    notFound();
  }

  // Check/create enrollment for free courses
  let enrollment = await getEnrollment(courseId, userId);
  if (!enrollment) {
    enrollment = await autoEnrollIfFree(courseId, userId);
    if (!enrollment) {
      // Course is paid and user is not enrolled
      redirect(`/courses/${courseId}?enroll=true`);
    }
  }

  // Get lesson progress
  const lessonProgress = await getLessonProgressForCourse(courseId, userId);

  // Flatten lessons for navigation
  const allLessons = flattenLessons(course.courseSessions);

  // Determine current lesson
  let currentLesson = lessonIdParam
    ? getLessonById(allLessons, lessonIdParam)
    : null;

  // If no lesson specified or invalid, find the next lesson to continue
  if (!currentLesson) {
    currentLesson = findNextLesson(allLessons, lessonProgress);
  }

  // If still no lesson (empty course), show error
  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-trustsec-1">
            No lessons available
          </h1>
          <p className="text-muted-foreground mt-2">
            This course doesn&apos;t have any lessons yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<LearnPageSkeleton />}>
      <CourseLearningPage
        course={course}
        allLessons={allLessons}
        currentLesson={currentLesson}
        lessonProgress={lessonProgress}
        userId={userId}
      />
    </Suspense>
  );
}
