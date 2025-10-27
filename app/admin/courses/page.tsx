import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, Users, BarChart3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Admin course data - courses you've created
type AdminCourseData = {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  thumbnail: string;
  enrolledStudents: number;
  completionRate: number;
  status: "published" | "draft";
};

const ADMIN_COURSES: AdminCourseData[] = [
  {
    id: "1",
    title: "Introduction to Cybersecurity",
    description:
      "Learn the fundamentals of cybersecurity, including threat landscapes, risk assessment, and basic security principles.",
    level: "Beginner",
    duration: "8 hours",
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    enrolledStudents: 245,
    completionRate: 78,
    status: "published",
  },
  {
    id: "2",
    title: "Advanced Ethical Hacking",
    description:
      "Master penetration testing techniques, vulnerability assessment, and ethical hacking methodologies.",
    level: "Advanced",
    duration: "24 hours",
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
    enrolledStudents: 128,
    completionRate: 65,
    status: "published",
  },
  {
    id: "3",
    title: "Network Security Fundamentals",
    description:
      "Understand network protocols, firewalls, intrusion detection systems, and network security best practices.",
    level: "Intermediate",
    duration: "16 hours",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
    enrolledStudents: 312,
    completionRate: 82,
    status: "published",
  },
  {
    id: "4",
    title: "Cryptography Basics",
    description:
      "Explore encryption algorithms, PKI, digital signatures and data protection strategies.",
    level: "Intermediate",
    duration: "12 hours",
    thumbnail:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop",
    enrolledStudents: 0,
    completionRate: 0,
    status: "draft",
  },
  {
    id: "5",
    title: "Cloud Security Best Practices",
    description:
      "Secure cloud infrastructure, implement IAM policies, and protect cloud-native applications.",
    level: "Advanced",
    duration: "18 hours",
    thumbnail:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop",
    enrolledStudents: 0,
    completionRate: 0,
    status: "draft",
  },
];

export default async function AdminCoursesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // TODO: Check if user is admin
  // if (session.user.role !== "admin") {
  //   redirect("/courses");
  // }

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
              <CardTitle className="text-3xl">{ADMIN_COURSES.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Students</CardDescription>
              <CardTitle className="text-3xl">
                {ADMIN_COURSES.reduce((sum, c) => sum + c.enrolledStudents, 0)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Published</CardDescription>
              <CardTitle className="text-3xl">
                {ADMIN_COURSES.filter((c) => c.status === "published").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Drafts</CardDescription>
              <CardTitle className="text-3xl">
                {ADMIN_COURSES.filter((c) => c.status === "draft").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Course Cards */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADMIN_COURSES.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                {/* Course Thumbnail */}
                <div className="relative h-48 w-full">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Button size="icon" variant="secondary" className="size-8">
                      <MoreVertical className="size-4" />
                    </Button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course.status === "published"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {course.status === "published" ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl line-clamp-1">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {course.level} • {course.duration}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="size-4" />
                      <span>{course.enrolledStudents} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="size-4" />
                      <span>{course.completionRate}%</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Link
                      href={`/admin/courses/${course.id}`}
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Link
                      href={`/admin/courses/${course.id}/edit`}
                      className="flex-1"
                    >
                      <Button className="w-full">Edit</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
