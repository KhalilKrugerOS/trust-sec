"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

interface UpdateLessonData {
  title: string;
  duration: number | null;
  thumbnailKey: string | null;
  videoKey: string | null;
  content: string | null;
}

export async function updateLesson(
  lessonId: string,
  data: UpdateLessonData
): Promise<ApiResponse> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
      return { status: "error", message: "Not authenticated" };
    }

    if (session.user.role !== "admin") {
      return { status: "error", message: "Not authorized" };
    }

    // Verify the lesson exists and belongs to the user's course
    const existingLesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        session: {
          include: {
            course: {
              select: { userId: true },
            },
          },
        },
      },
    });

    if (!existingLesson) {
      return { status: "error", message: "Lesson not found" };
    }

    if (existingLesson.session.course.userId !== session.user.id) {
      return { status: "error", message: "Not authorized to edit this lesson" };
    }

    // Update the lesson
    const updatedLesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        title: data.title,
        duration: data.duration,
        thumbnailKey: data.thumbnailKey,
        videoKey: data.videoKey,
        content: data.content,
      },
    });

    // Revalidate relevant paths
    revalidatePath(`/admin/courses/${existingLesson.session.courseId}/edit`);
    revalidatePath(
      `/admin/courses/${existingLesson.session.courseId}/lessons/${lessonId}/edit`
    );

    return { status: "success", message: "Lesson updated successfully" };
  } catch (error) {
    console.error("Error updating lesson:", error);
    return { status: "error", message: "Failed to update lesson" };
  }
}
