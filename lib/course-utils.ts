/**
 * Shared types and utility functions for courses
 * Can be imported by both server and client components
 */

// Types for course data
export type PublicLesson = {
  id: string;
  title: string;
  type: "VIDEO" | "READING";
  duration: number | null;
  order: number;
  content: string | null;
  thumbnailKey: string | null;
  videoKey: string | null;
};

export type PublicSession = {
  id: string;
  title: string;
  description: string | null;
  order: number;
  lessons: PublicLesson[];
};

export type PublicCourse = {
  id: string;
  title: string;
  description: string;
  smallDescription: string;
  fileKey: string;
  price: number;
  duration: number;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: string;
  slug: string;
  courseSessions: PublicSession[];
};

export type LessonProgressRecord = {
  id: string;
  lessonId: string;
  userId: string;
  completed: boolean;
  progressSeconds: number;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Calculate course progress percentage
 */
export function calculateCourseProgress(
  lessonProgress: LessonProgressRecord[],
  totalLessons: number
): number {
  if (totalLessons === 0) return 0;

  const completedCount = lessonProgress.filter((p) => p.completed).length;
  return Math.round((completedCount / totalLessons) * 100);
}

/**
 * Get flat list of all lessons from course sessions
 */
export function flattenLessons(
  courseSessions: PublicSession[]
): PublicLesson[] {
  return courseSessions.flatMap((session) => session.lessons);
}

/**
 * Find the first incomplete lesson or return the first lesson
 */
export function findNextLesson(
  lessons: PublicLesson[],
  lessonProgress: LessonProgressRecord[]
): PublicLesson | null {
  if (lessons.length === 0) return null;

  const completedIds = new Set(
    lessonProgress.filter((p) => p.completed).map((p) => p.lessonId)
  );

  // Find first incomplete lesson
  const nextLesson = lessons.find((lesson) => !completedIds.has(lesson.id));

  // Return first incomplete or first lesson if all complete
  return nextLesson || lessons[0];
}

/**
 * Get lesson by ID from flat list
 */
export function getLessonById(
  lessons: PublicLesson[],
  lessonId: string
): PublicLesson | null {
  return lessons.find((lesson) => lesson.id === lessonId) || null;
}

/**
 * Get lesson position info
 */
export function getLessonPosition(
  lessons: PublicLesson[],
  lessonId: string
): { current: number; total: number; hasNext: boolean; hasPrevious: boolean } {
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);
  return {
    current: index + 1,
    total: lessons.length,
    hasNext: index < lessons.length - 1,
    hasPrevious: index > 0,
  };
}

/**
 * Get previous lesson ID
 */
export function getPreviousLessonId(
  lessons: PublicLesson[],
  currentLessonId: string
): string | null {
  const index = lessons.findIndex((lesson) => lesson.id === currentLessonId);
  if (index <= 0) return null;
  return lessons[index - 1].id;
}

/**
 * Get next lesson ID
 */
export function getNextLessonId(
  lessons: PublicLesson[],
  currentLessonId: string
): string | null {
  const index = lessons.findIndex((lesson) => lesson.id === currentLessonId);
  if (index === -1 || index >= lessons.length - 1) return null;
  return lessons[index + 1].id;
}
