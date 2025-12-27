import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "./_components/LogoutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CourseCard from "@/components/courses/CourseCard";
import { prisma } from "@/lib/db";
import { PublicNavbar } from "@/components/courses/PublicNavbar";

async function getPublishedCourses() {
  return await prisma.course.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      level: true,
      status: true,
      price: true,
      fileKey: true,
      isBookmarked: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function CoursesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const courses = await getPublishedCourses();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <PublicNavbar />

      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Courses</h1>
            <p className="text-muted-foreground text-sm">
              Browse our cybersecurity courses
            </p>
          </div>
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {session.user.name}
              </span>
              <LogoutButton />
            </div>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                variant={index % 2 === 0 ? "default" : "outlined"}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-2xl font-semibold mb-2">
              No courses available
            </h2>
            <p className="text-muted-foreground">
              Check back later for new courses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
