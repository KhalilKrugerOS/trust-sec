import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Clock, Bookmark } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export type AdminCourse = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  thumbnail: string;
  progress: number; // 0-100
  isBookmarked?: boolean;
};

type AdminCourseCardProps = {
  course: AdminCourse;
};

export default function AdminCourseCard({ course }: AdminCourseCardProps) {
  return (
    <div className="bg-trustsec-widget rounded-2xl overflow-hidden h-[700px] flex flex-col shadow-lg">
      {/* Course Thumbnail */}
      <div className="relative h-[260px] overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Bookmark Icon */}
        <div className="absolute top-6 left-6">
          <div className="backdrop-blur-md bg-trustsec-1/90 p-3 rounded-full">
            <Bookmark
              className={`size-7 ${
                course.isBookmarked ? "fill-white text-white" : "text-white"
              }`}
            />
          </div>
        </div>

        {/* Level Badge */}
        <div className="absolute top-6 right-6">
          <div className="backdrop-blur-md bg-trustsec-1/90 px-4 py-1 rounded-xl">
            <span className="text-white font-medium text-base">
              {course.level}
            </span>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex-1 flex flex-col px-8 py-6 gap-3">
        {/* Title */}
        <h3 className="font-semibold text-[27px] leading-[38px] text-white">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-white/80 text-lg leading-[27px]">
          {course.description}
        </p>

        {/* Duration */}
        <div className="flex items-center gap-2">
          <Clock className="size-5 text-white/80" />
          <span className="text-white/80 text-lg">{course.duration}</span>
        </div>

        {/* Progress Section */}
        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-white text-lg">Progress</span>
            <span className="text-trustsec-2 font-medium text-lg">
              {course.progress}%
            </span>
          </div>
          <Progress value={course.progress} className="h-3" />
        </div>
      </div>

      {/* Continue Learning Button */}
      <div className="px-8 pb-8">
        <Link href={`/courses/${course.id}`} className="block">
          <Button className="w-full h-14 text-lg font-medium rounded-xl">
            Continue Learning
          </Button>
        </Link>
      </div>
    </div>
  );
}
