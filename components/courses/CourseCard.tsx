import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Clock, Bookmark } from "lucide-react";
import Link from "next/link";
import { COURSE_LEVELS, CourseStatus } from "@/lib/zodSchemas";

export type Course = {
  id: string;
  title: string;
  smallDescription: string;
  level: (typeof COURSE_LEVELS)[number];
  status: (typeof CourseStatus)[number];
  price: number;
  fileKey: string;
  isBookmarked?: boolean;
};

type CourseCardProps = {
  course: Course;
  variant?: "default" | "outlined";
};

export default function CourseCard({
  course,
  variant = "default",
}: CourseCardProps) {
  const isOutlined = variant === "outlined";

  return (
    <div
      className={`bg-card rounded-2xl overflow-hidden h-[700px] flex flex-col ${
        isOutlined ? "border-2 border-trustsec-3" : "shadow-lg"
      }`}
    >
      {/* Course Thumbnail */}
      <div className="relative h-[260px] overflow-hidden">
        <Image
          src={course.fileKey}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Bookmark Icon */}
        <div className="absolute top-6 left-6">
          <div className="backdrop-blur-md bg-white/90 dark:bg-trustsec-widget/90 p-3 rounded-full">
            <Bookmark
              className={`size-7 ${
                course.isBookmarked
                  ? "fill-trustsec-2 text-trustsec-2"
                  : "text-trustsec-1"
              }`}
            />
          </div>
        </div>

        {/* Level Badge */}
        <div className="absolute top-6 right-6">
          <div className="backdrop-blur-md bg-white/90 dark:bg-trustsec-widget/90 px-4 py-1 rounded-xl">
            <span className="text-trustsec-1 font-medium text-base">
              {course.level}
            </span>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex-1 flex flex-col p-8 gap-3">
        {/* Title */}
        <h3
          className={`font-semibold text-[27px] leading-[38px] ${
            isOutlined ? "text-trustsec-2" : "text-trustsec-1"
          }`}
        >
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-lg leading-[27px]">
          {course.smallDescription}
        </p>

        {/* Duration */}
        {/* <div className="flex items-center gap-2 mt-auto">
          <Clock className="size-5 text-muted-foreground" />
          <span className="text-muted-foreground text-lg">
            {course.duration}
          </span>
        </div> */}
      </div>

      {/* Start Course Button */}
      <div className="px-8 pb-8">
        <Link href={`/courses/${course.id}`} className="block">
          <Button className="w-full h-14 text-lg font-medium rounded-xl">
            Start Course
          </Button>
        </Link>
      </div>
    </div>
  );
}
