"use client";

import { useRouter } from "next/navigation";
import {
  PublicLesson,
  LessonProgressRecord,
  getLessonPosition,
  getPreviousLessonId,
  getNextLessonId,
} from "@/lib/course-utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { VideoPlayer } from "@/components/courses/VideoPlayer";
import { RichTextRenderer } from "@/components/rich-text-editor/RichTextRenderer";
import { markLessonComplete } from "../actions";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface LessonContentProps {
  courseId: string;
  lesson: PublicLesson;
  allLessons: PublicLesson[];
  lessonProgress: LessonProgressRecord[];
}

export function LessonContent({
  courseId,
  lesson,
  allLessons,
  lessonProgress,
}: LessonContentProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isCompleted, setIsCompleted] = useState(() => {
    const progress = lessonProgress.find((p) => p.lessonId === lesson.id);
    return progress?.completed ?? false;
  });

  const position = getLessonPosition(allLessons, lesson.id);
  const previousLessonId = getPreviousLessonId(allLessons, lesson.id);
  const nextLessonId = getNextLessonId(allLessons, lesson.id);

  const handlePrevious = () => {
    if (previousLessonId) {
      router.push(`/courses/${courseId}/learn?lesson=${previousLessonId}`);
    }
  };

  const handleNext = () => {
    if (nextLessonId) {
      router.push(`/courses/${courseId}/learn?lesson=${nextLessonId}`);
    }
  };

  const handleMarkComplete = () => {
    startTransition(async () => {
      try {
        await markLessonComplete(lesson.id, courseId);
        setIsCompleted(true);
        toast.success("Lesson marked as complete!");
      } catch (error) {
        console.error("Failed to mark lesson complete:", error);
        toast.error("Failed to mark lesson as complete");
      }
    });
  };

  const handleVideoComplete = () => {
    if (!isCompleted) {
      setIsCompleted(true);
      // The server action is called by the VideoPlayer component
    }
  };

  // Get saved progress for resuming
  const savedProgress = lessonProgress.find((p) => p.lessonId === lesson.id);
  const initialProgress = savedProgress?.progressSeconds ?? 0;

  return (
    <div className="space-y-6">
      {/* Video Player Area */}
      <Card className="bg-white dark:bg-trustsec-widget border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <VideoPlayer
            lessonId={lesson.id}
            courseId={courseId}
            videoKey={lesson.videoKey}
            thumbnailKey={lesson.thumbnailKey}
            title={lesson.title}
            duration={lesson.duration}
            initialProgress={initialProgress}
            onComplete={handleVideoComplete}
          />
        </CardContent>
      </Card>

      {/* Lesson Details */}
      <Card className="bg-white dark:bg-trustsec-widget border-slate-200 dark:border-slate-700 shadow-sm">
        <CardContent className="p-6 space-y-6">
          {/* Title & Status */}
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-xl font-semibold text-trustsec-1 dark:text-white">
              {lesson.title}
            </h1>
            {isCompleted ? (
              <Badge className="bg-[#ddf2f3] text-trustsec-2 border-0 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Completed
              </Badge>
            ) : (
              <Badge className="bg-[#ddf2f3] text-trustsec-2 border-0 shrink-0">
                In Progress
              </Badge>
            )}
          </div>

          {/* Description / Content */}
          {lesson.content && (
            <RichTextRenderer 
              content={lesson.content} 
              className="text-base text-slate-600 dark:text-slate-300"
            />
          )}

          {/* Mark Complete Button (manual) */}
          {!isCompleted && (
            <Button
              onClick={handleMarkComplete}
              disabled={isPending}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {isPending ? "Marking..." : "Mark as Complete"}
            </Button>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
            <Button
              onClick={handlePrevious}
              disabled={!position.hasPrevious}
              variant="default"
              className="bg-trustsec-2 hover:bg-trustsec-2/90"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </Button>

            <span className="text-base text-slate-500 dark:text-slate-400">
              Lesson {position.current} of {position.total}
            </span>

            <Button
              onClick={handleNext}
              disabled={!position.hasNext}
              variant="default"
              className="bg-trustsec-2 hover:bg-trustsec-2/90"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
