import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import AdminCourseCard from "@/components/courses/AdminCourseCard";

export default async function AdminCoursesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const courses = await adminGetCourses();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Course Management</h1>
              <p className="text-muted-foreground mt-1">
                Create and manage your courses
              </p>
            </div>
            <Link href="/admin/courses/create">
              <Button size="lg" className="gap-2">
                <Plus className="size-5" />
                Create Course
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Courses</CardDescription>
              <CardTitle className="text-3xl">{courses.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Published</CardDescription>
              <CardTitle className="text-3xl">
                {courses.filter((c) => c.status === "PUBLISHED").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Drafts</CardDescription>
              <CardTitle className="text-3xl">
                {courses.filter((c) => c.status === "DRAFT").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Archived</CardDescription>
              <CardTitle className="text-3xl">
                {courses.filter((c) => c.status === "ARCHIVED").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Course Cards */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Courses</h2>
            {courses.length === 0 && (
              <Link href="/admin/courses/create">
                <Button variant="outline">
                  <Plus className="size-4 mr-2" />
                  Create Your First Course
                </Button>
              </Link>
            )}
          </div>

          {courses.length === 0 ? (
            <Card className="p-12">
              <div className="text-center space-y-4">
                <div className="mx-auto size-16 rounded-full bg-muted flex items-center justify-center">
                  <Plus className="size-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Get started by creating your first course
                  </p>
                  <Link href="/admin/courses/create">
                    <Button>
                      <Plus className="size-4 mr-2" />
                      Create Course
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <AdminCourseCard key={course.id} data={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
