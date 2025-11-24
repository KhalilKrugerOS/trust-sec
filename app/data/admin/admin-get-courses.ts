import { prisma } from "@/lib/db";

export async function adminGetCourses() {
  const data = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      status: true,
      level: true,
      price: true,
      fileKey: true,
      slug: true,
      duration: true,
      createdAt: true,
    },
  });
  return data;
}

export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourses>>[0];
