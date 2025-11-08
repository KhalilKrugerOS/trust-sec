"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { CourseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { headers } from "next/headers";

export async function CreateCourse(
  data: CourseSchemaType
): Promise<ApiResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Validate session exists
    if (!session || !session.user || !session.user.id) {
      return {
        status: "error",
        message: "Unauthorized: You must be logged in to create a course",
      };
    }

    const validation = CourseSchema.safeParse(data);

    if (!validation.success) {
      console.log(validation.error);
      return {
        status: "error",
        message: "Invalid Form data",
      };
    }

    const course = await prisma.course.create({
      data: {
        ...validation.data,
        userId: session.user.id, // Now guaranteed to be a string
      },
    });

    return {
      status: "success",
      message: "Course created successfully, " + course.id,
    };
  } catch (error) {
    return {
      status: "error",
      message: `An unexpected error occurred, ${error}`,
    };
  }
}
