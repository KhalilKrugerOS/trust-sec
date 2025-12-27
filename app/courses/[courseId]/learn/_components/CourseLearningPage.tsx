"use client";

import {
  PublicCourse,
  PublicLesson,
  LessonProgressRecord,
} from "@/lib/course-utils";
import { CourseInfoCard } from "./CourseInfoCard";
import { LessonList } from "./LessonList";
import { LessonContent } from "./LessonContent";
import { PublicNavbar } from "@/components/courses/PublicNavbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CourseLearningPageProps {
  course: PublicCourse;
  allLessons: PublicLesson[];
  currentLesson: PublicLesson;
  lessonProgress: LessonProgressRecord[];
  userId: string;
}

export function CourseLearningPage({
  course,
  allLessons,
  currentLesson,
  lessonProgress,
  userId,
}: CourseLearningPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-trustsec-1">
      {/* Navbar */}
      <PublicNavbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-6">
        {/* Back Link */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-trustsec-1 dark:text-white hover:text-trustsec-2 transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Courses
        </Link>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="w-full lg:w-[412px] shrink-0 space-y-6">
            <CourseInfoCard
              course={course}
              allLessons={allLessons}
              lessonProgress={lessonProgress}
            />
            <LessonList
              courseId={course.id}
              sessions={course.courseSessions}
              currentLessonId={currentLesson.id}
              lessonProgress={lessonProgress}
            />
          </aside>

          {/* Right Main Content */}
          <div className="flex-1 min-w-0">
            <LessonContent
              courseId={course.id}
              lesson={currentLesson}
              allLessons={allLessons}
              lessonProgress={lessonProgress}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
