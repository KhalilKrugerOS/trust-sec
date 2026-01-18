import { redirect } from "next/navigation";
import LoginForm from "./_components/LoginForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

/**
 * LOGIN PAGE
 * ==========
 * Entry point for authentication.
 *
 * REDIRECT FLOW:
 * 1. If user is already logged in:
 *    - Admin → /admin
 *    - Regular user → intended redirect or /courses
 *
 * 2. If not logged in:
 *    - Show login form with redirect param preserved
 *    - After auth, /auth/post-login handles role-based redirect
 */
export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirect: redirectTo } = await searchParams;

  console.log("🔄 LoginPage redirect param:", redirectTo);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Already logged in - redirect based on role
  if (session) {
    // Admin users always go to admin dashboard
    if (session.user?.role === "admin") {
      console.log(
        "👑 LoginPage - Already logged in as admin, redirecting to /admin"
      );
      return redirect("/admin");
    }

    console.log(
      "👤 LoginPage - Already logged in, redirecting to:",
      redirectTo || "/courses"
    );
    return redirect(redirectTo || "/courses");
  }

  return <LoginForm redirectTo={redirectTo} />;
}
