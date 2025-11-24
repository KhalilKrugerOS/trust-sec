import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function adminGetLesson(lessonId: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: {
      id: true,
      title: true,
      order: true,
      duration: true,
      thumbnailKey: true,
      videoKey: true,
      content: true,
      sessionId: true,
      session: {
        select: {
          id: true,
          title: true,
          courseId: true,
        },
      },
    },
  });

  if (!lesson) {
    return notFound();
  }

  return lesson;
}

export type AdminLessonType = Awaited<ReturnType<typeof adminGetLesson>>;
