import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "./_components/LogoutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock } from "lucide-react";
import CourseCard, { type Course } from "@/components/courses/CourseCard";

// Sample course data - Replace with database query later
const SAMPLE_COURSES: Course[] = [
  {
    id: "1",
    title: "Introduction to Cybersecurity",
    description:
      "Learn the fundamentals of cybersecurity, including threat landscapes, risk assessment, and basic security principles.",
    level: "Beginner",
    duration: "8 hours",
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    isBookmarked: true,
  },
  {
    id: "2",
    title: "Network Security Essentials",
    description:
      "Master network security concepts, protocols, and best practices for securing network infrastructure.",
    level: "Intermediate",
    duration: "12 hours",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
    isBookmarked: false,
  },
  {
    id: "3",
    title: "Ethical Hacking & Penetration Testing",
    description:
      "Discover ethical hacking techniques, vulnerability assessment, and penetration testing methodologies.",
    level: "Advanced",
    duration: "20 hours",
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
    isBookmarked: false,
  },
];

export default async function CoursesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Courses</h1>
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {session.user.name}
              </span>
              <LogoutButton />
            </div>
          ) : (
            <Link href="/login">
              <Button>Login to Access</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {session ? (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Your Courses</h2>
              <p className="text-muted-foreground">
                Continue your learning journey
              </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SAMPLE_COURSES.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  variant={index % 2 === 0 ? "default" : "outlined"}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-muted rounded-full p-6 mb-6">
              <Lock className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Login to Access Courses</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Sign in to view your enrolled courses, track your progress, and
              continue your learning journey.
            </p>
            <Link href="/login">
              <Button size="lg">Sign In Now</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
