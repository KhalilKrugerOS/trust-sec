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
    const validation = CourseSchema.safeParse(data);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid Form data",
      };
    }

    const payload = {
      ...validation.data,
      userId: session?.user.id as string,
    };

    const course = await prisma.course.create({
      data: payload,
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
