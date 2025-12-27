"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { getS3PublicUrl } from "@/lib/s3-utils";
import {
  updateLessonProgress,
  checkVideoCompletion,
} from "@/app/courses/[courseId]/learn/actions";
import { Play, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  lessonId: string;
  courseId: string;
  videoKey?: string | null;
  thumbnailKey?: string | null;
  title: string;
  duration?: number | null; // in minutes
  initialProgress?: number; // in seconds
  onComplete?: () => void;
}

const PROGRESS_SAVE_INTERVAL = 10; // Save progress every 10 seconds
const COMPLETION_THRESHOLD = 0.9; // 90%

export function VideoPlayer({
  lessonId,
  courseId,
  videoKey,
  thumbnailKey,
  title,
  duration,
  initialProgress = 0,
  onComplete,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const lastSavedTime = useRef(0);

  const videoUrl = videoKey ? getS3PublicUrl(videoKey) : null;
  const thumbnailUrl = thumbnailKey ? getS3PublicUrl(thumbnailKey) : null;

  // Convert duration from minutes to seconds if available
  const expectedDuration = duration ? duration * 60 : 0;

  // Set initial progress when video loads
  useEffect(() => {
    if (videoRef.current && initialProgress > 0) {
      videoRef.current.currentTime = initialProgress;
    }
  }, [initialProgress]);

  // Save progress periodically
  const saveProgress = useCallback(
    async (seconds: number) => {
      if (Math.abs(seconds - lastSavedTime.current) >= PROGRESS_SAVE_INTERVAL) {
        lastSavedTime.current = seconds;
        try {
          await updateLessonProgress(lessonId, Math.floor(seconds));
        } catch (error) {
          console.error("Failed to save progress:", error);
        }
      }
    },
    [lessonId]
  );

  // Check for completion
  const checkCompletion = useCallback(
    async (currentSeconds: number, totalSeconds: number) => {
      if (hasCompleted || totalSeconds <= 0) return;

      const percentWatched = currentSeconds / totalSeconds;
      if (percentWatched >= COMPLETION_THRESHOLD) {
        setHasCompleted(true);
        try {
          await checkVideoCompletion(
            lessonId,
            courseId,
            currentSeconds,
            totalSeconds
          );
          onComplete?.();
        } catch (error) {
          console.error("Failed to mark completion:", error);
        }
      }
    },
    [lessonId, courseId, hasCompleted, onComplete]
  );

  // Handle time update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;

    setCurrentTime(current);

    // Save progress periodically
    saveProgress(current);

    // Check for completion
    if (total > 0) {
      checkCompletion(current, total);
    }
  };

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
      // Resume from saved progress
      if (initialProgress > 0) {
        videoRef.current.currentTime = initialProgress;
      }
    }
  };

  // Handle play button click
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setHasStarted(true);
      setIsPlaying(true);
    }
  };

  // Handle video events
  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);
  const handleVideoEnded = () => {
    setIsPlaying(false);
    // Force completion check when video ends
    if (videoRef.current) {
      checkCompletion(videoRef.current.currentTime, videoRef.current.duration);
    }
  };

  // Save progress when component unmounts or lesson changes
  useEffect(() => {
    return () => {
      if (videoRef.current && currentTime > 0) {
        // Fire and forget - save final progress
        updateLessonProgress(lessonId, Math.floor(currentTime)).catch(
          console.error
        );
      }
    };
  }, [lessonId, currentTime]);

  // No video available - show placeholder
  if (!videoUrl) {
    return (
      <div
        className={cn(
          "relative w-full aspect-video rounded-t-xl overflow-hidden",
          "bg-gradient-to-br from-trustsec-2/20 to-trustsec-3/20"
        )}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <Shield className="w-20 h-20 text-trustsec-2" strokeWidth={1.5} />
          <h3 className="text-2xl font-semibold text-trustsec-1">{title}</h3>
          <Button
            disabled
            className="bg-trustsec-2 hover:bg-trustsec-2/90 text-white gap-2"
          >
            <Play className="w-5 h-5" fill="currentColor" />
            Video Coming Soon
          </Button>
          <p className="text-sm text-slate-500 mt-2">
            Video upload is temporarily unavailable
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-t-xl overflow-hidden">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnailUrl || undefined}
        className="w-full h-full object-contain"
        controls={hasStarted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        onEnded={handleVideoEnded}
        playsInline
      />

      {/* Play Button Overlay (before video starts) */}
      {!hasStarted && (
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-4 cursor-pointer",
            "bg-gradient-to-br from-trustsec-2/20 to-trustsec-3/20"
          )}
          onClick={handlePlay}
        >
          <Shield className="w-20 h-20 text-trustsec-2" strokeWidth={1.5} />
          <h3 className="text-2xl font-semibold text-trustsec-1">{title}</h3>
          <Button className="bg-trustsec-2 hover:bg-trustsec-2/90 text-white gap-2">
            <Play className="w-5 h-5" fill="currentColor" />
            Play Video
          </Button>
        </div>
      )}
    </div>
  );
}
