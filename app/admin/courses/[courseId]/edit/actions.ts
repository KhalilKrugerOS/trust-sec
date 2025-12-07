"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { CourseSchema, CourseSchemaType } from "@/lib/zodSchemas";

export async function EditCourse(
  data: CourseSchemaType,
  courseId: string
): Promise<ApiResponse> {
  const user = await requireAdmin();
  try {
    const result = CourseSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid Form data",
      };
    }
    await prisma.course.update({
      where: { id: courseId, userId: user.user.id },
      data: {
        ...result.data,
      },
    });
    return {
      status: "success",
      message: "Course updated successfully",
    };
  } catch {
    return {
      status: "error",
      message: "An unexpected error occurred, failed to update course",
    };
  }
}

// Types for course structure
interface LessonData {
  id: string;
  title: string;
  type: "video" | "reading";
  duration?: number;
  order: number;
}

interface SessionData {
  id: string;
  title: string;
  order: number;
  lessons: LessonData[];
}

export async function saveCourseStructure(
  courseId: string,
  sessions: SessionData[]
): Promise<ApiResponse> {
  const user = await requireAdmin();

  try {
    // Verify course ownership
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { userId: true },
    });

    if (!course) {
      return { status: "error", message: "Course not found" };
    }

    if (course.userId !== user.user.id) {
      return { status: "error", message: "Not authorized" };
    }

    //  Get existing sessions with lessons
    const existingSessions = await prisma.courseSession.findMany({
      where: { courseId },
      include: { lessons: true },
    });

    //  Identify sessions to delete
    const incomingSessionIds = new Set(
      sessions.filter((s) => !s.id.startsWith("session-")).map((s) => s.id)
    );

    const sessionsToDelete = existingSessions.filter(
      (s) => !incomingSessionIds.has(s.id)
    );

    //  Delete removed sessions (cascade deletes lessons)
    for (const sessionToDelete of sessionsToDelete) {
      await prisma.courseSession.delete({
        where: { id: sessionToDelete.id },
      });
    }

    // STEP 5: Process each session
    for (const sessionData of sessions) {
      const isNewSession = sessionData.id.startsWith("session-");

      if (isNewSession) {
        // CREATE new session with its lessons
        await prisma.courseSession.create({
          data: {
            title: sessionData.title,
            order: sessionData.order,
            courseId: courseId,
            lessons: {
              create: sessionData.lessons
                .filter((l) => l.id.startsWith("lesson-"))
                .map((lesson) => ({
                  title: lesson.title,
                  type: lesson.type.toUpperCase() as "VIDEO" | "READING",
                  duration: lesson.duration || null,
                  order: lesson.order,
                })),
            },
          },
        });
      } else {
        // UPDATE existing session
        await prisma.courseSession.update({
          where: { id: sessionData.id },
          data: {
            title: sessionData.title,
            order: sessionData.order,
          },
        });

        // Handle lessons for this session
        const existingSession = existingSessions.find(
          (s) => s.id === sessionData.id
        );

        if (existingSession) {
          const existingLessonIds = new Set(
            existingSession.lessons.map((l) => l.id)
          );
          const incomingLessonIds = new Set(
            sessionData.lessons
              .filter((l) => !l.id.startsWith("lesson-"))
              .map((l) => l.id)
          );

          // Delete removed lessons
          const lessonsToDelete = existingSession.lessons.filter(
            (l) => !incomingLessonIds.has(l.id)
          );

          for (const lessonToDelete of lessonsToDelete) {
            await prisma.lesson.delete({
              where: { id: lessonToDelete.id },
            });
          }

          // Process each lesson (create or update)
          for (const lessonData of sessionData.lessons) {
            const isNewLesson = lessonData.id.startsWith("lesson-");

            if (isNewLesson) {
              // CREATE new lesson
              await prisma.lesson.create({
                data: {
                  title: lessonData.title,
                  type: lessonData.type.toUpperCase() as "VIDEO" | "READING",
                  duration: lessonData.duration || null,
                  order: lessonData.order,
                  sessionId: sessionData.id,
                },
              });
            } else {
              // UPDATE existing lesson
              await prisma.lesson.update({
                where: { id: lessonData.id },
                data: {
                  title: lessonData.title,
                  type: lessonData.type.toUpperCase() as "VIDEO" | "READING",
                  duration: lessonData.duration || null,
                  order: lessonData.order,
                },
              });
            }
          }
        }
      }
    }

    return {
      status: "success",
      message: "Course structure saved successfully",
    };
  } catch (error) {
    console.error("Error saving course structure:", error);
    return {
      status: "error",
      message: "Failed to save course structure",
    };
  }
}
