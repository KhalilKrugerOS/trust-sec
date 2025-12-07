import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/app/data/admin/require-admin";
import DeleteCourseConfirmation from "./_components/DeleteCourseConfirmation";

interface DeleteCoursePageProps {
  params: Promise<{ courseId: string }>;
}

async function getCourseForDelete(courseId: string) {
  const user = await requireAdmin();

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      userId: true,
      _count: {
        select: {
          courseSessions: true,
        },
      },
    },
  });

  if (!course || course.userId !== user.user.id) {
    return null;
  }

  return course;
}

export default async function DeleteCoursePage({
  params,
}: DeleteCoursePageProps) {
  const { courseId } = await params;
  const course = await getCourseForDelete(courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="container max-w-2xl py-10">
      <DeleteCourseConfirmation
        courseId={course.id}
        courseTitle={course.title}
        sessionCount={course._count.courseSessions}
      />
    </div>
  );
}
