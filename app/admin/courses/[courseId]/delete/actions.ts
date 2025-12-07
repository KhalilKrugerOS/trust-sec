"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function deleteCourse(courseId: string): Promise<ApiResponse> {
  const user = await requireAdmin();

  try {
    // Verify the course exists and belongs to the user
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { userId: true, title: true },
    });

    if (!course) {
      return {
        status: "error",
        message: "Course not found",
      };
    }

    if (course.userId !== user.user.id) {
      return {
        status: "error",
        message: "Not authorized to delete this course",
      };
    }

    // Delete the course (cascades to sessions and lessons)
    await prisma.course.delete({
      where: { id: courseId },
    });

    // Revalidate the courses list
    revalidatePath("/admin/courses");

    return {
      status: "success",
      message: `Course "${course.title}" deleted successfully`,
    };
  } catch (error) {
    console.error("Error deleting course:", error);
    return {
      status: "error",
      message: "Failed to delete course",
    };
  }
}
