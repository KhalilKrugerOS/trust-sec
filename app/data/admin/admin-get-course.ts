import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";
import { notFound } from "next/navigation";

export async function adminGetCourse(courseId: string) {
  //await requireAdmin();
  const data = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      description: true,
      smallDescription: true,
      status: true,
      level: true,
      price: true,
      slug: true,
      duration: true,
      fileKey: true,
      category: true,
      courseSessions: {
        select: {
          id: true,
          title: true,
          order: true,
          lessons: {
            select: {
              id: true,
              title: true,
              order: true,
              duration: true,
              thumbnailKey: true,
              videoKey: true,
              content: true,
            },
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export type AdminCourseSingularType = Awaited<
  ReturnType<typeof adminGetCourse>
>;
