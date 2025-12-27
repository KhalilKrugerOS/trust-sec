"use client";

import {
  PublicCourse,
  PublicLesson,
  LessonProgressRecord,
  calculateCourseProgress,
} from "@/lib/course-utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface CourseInfoCardProps {
  course: PublicCourse;
  allLessons: PublicLesson[];
  lessonProgress: LessonProgressRecord[];
}

export function CourseInfoCard({
  course,
  allLessons,
  lessonProgress,
}: CourseInfoCardProps) {
  const progress = calculateCourseProgress(lessonProgress, allLessons.length);
  const completedCount = lessonProgress.filter((p) => p.completed).length;

  const levelLabel = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
  }[course.level];

  // Format duration (stored in minutes)
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours} hours`;
  };

  return (
    <Card className="bg-white dark:bg-trustsec-widget border-slate-200 dark:border-slate-700 shadow-sm">
      <CardContent className="p-6 space-y-4">
        {/* Course Title */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-trustsec-1 dark:text-white leading-tight">
            {course.title}
          </h2>

          {/* Level & Duration */}
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-slate-100 dark:bg-trustsec-1 text-trustsec-1 dark:text-white border-0"
            >
              {levelLabel}
            </Badge>
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <Clock className="w-5 h-5" />
              <span className="text-base">
                {formatDuration(course.duration)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-base text-slate-500 dark:text-slate-400">
              Overall Progress
            </span>
            <span className="text-base font-medium text-trustsec-2">
              {progress}%
            </span>
          </div>

          <Progress value={progress} className="h-2.5" />

          <p className="text-base text-slate-500 dark:text-slate-400">
            {completedCount} of {allLessons.length} lessons completed
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
