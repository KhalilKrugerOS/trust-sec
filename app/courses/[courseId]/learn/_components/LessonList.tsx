"use client";

import { useRouter } from "next/navigation";
import { PublicCourse, LessonProgressRecord } from "@/lib/course-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonListProps {
  courseId: string;
  sessions: PublicCourse["courseSessions"];
  currentLessonId: string;
  lessonProgress: LessonProgressRecord[];
}

export function LessonList({
  courseId,
  sessions,
  currentLessonId,
  lessonProgress,
}: LessonListProps) {
  const router = useRouter();

  // Create a map for quick progress lookup
  const progressMap = new Map(lessonProgress.map((p) => [p.lessonId, p]));

  const handleLessonClick = (lessonId: string) => {
    router.push(`/courses/${courseId}/learn?lesson=${lessonId}`);
  };

  // Flatten all lessons for display
  const allLessons = sessions.flatMap((session) => session.lessons);

  return (
    <Card className="bg-white dark:bg-trustsec-widget border-slate-200 dark:border-slate-700 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-trustsec-1 dark:text-white">
          Course Content
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col">
          {allLessons.map((lesson, index) => {
            const progress = progressMap.get(lesson.id);
            const isCompleted = progress?.completed ?? false;
            const isCurrent = lesson.id === currentLessonId;
            const isInProgress =
              !isCompleted && (progress?.progressSeconds ?? 0) > 0;

            // Determine status for styling
            let status: "completed" | "in-progress" | "available" = "available";
            if (isCompleted) status = "completed";
            else if (isCurrent || isInProgress) status = "in-progress";

            // Format duration
            const formatDuration = (minutes?: number | null) => {
              if (!minutes) return "";
              return `${minutes} min`;
            };

            return (
              <button
                key={lesson.id}
                onClick={() => handleLessonClick(lesson.id)}
                className={cn(
                  "flex items-center gap-4 px-6 py-5 text-left transition-colors w-full",
                  "hover:bg-slate-50 dark:hover:bg-trustsec-1/50",
                  isCurrent &&
                    "bg-[#ddf2f3] dark:bg-trustsec-3/20 border-l-[5px] border-trustsec-3",
                  !isCurrent && "border-l-[5px] border-transparent",
                  index !== allLessons.length - 1 &&
                    "border-b border-slate-100 dark:border-slate-700"
                )}
              >
                {/* Status Icon */}
                <div className="shrink-0">
                  {isCompleted ? (
                    <CheckCircle2
                      className="w-6 h-6 text-trustsec-3"
                      strokeWidth={2}
                    />
                  ) : isCurrent || isInProgress ? (
                    <PlayCircle
                      className="w-6 h-6 text-trustsec-3"
                      strokeWidth={2}
                    />
                  ) : (
                    <Circle
                      className="w-6 h-6 text-slate-300 dark:text-slate-500"
                      strokeWidth={2}
                    />
                  )}
                </div>

                {/* Lesson Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-medium text-trustsec-1 dark:text-white truncate">
                    {lesson.title}
                  </h4>
                  {lesson.duration && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {formatDuration(lesson.duration)}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
