import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * POST-LOGIN REDIRECT HANDLER
 * ===========================
 * This page handles intelligent redirects after OAuth login (Google).
 *
 * FLOW:
 * 1. User clicks "Sign in with Google" on /login?redirect=/courses/xxx
 * 2. Google OAuth completes → redirects here with ?redirect=/courses/xxx
 * 3. We check if user is admin:
 *    - Admin users → /admin (admin dashboard takes priority)
 *    - Regular users → intended redirect or /courses
 *
 * WHY THIS EXISTS:
 * - Better Auth's callbackURL doesn't let us run custom logic
 * - We need to check user role AFTER authentication completes
 * - Admins should always land on admin dashboard for security/UX
 */

interface PostLoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function PostLoginPage({
  searchParams,
}: PostLoginPageProps) {
  const { redirect: intendedRedirect } = await searchParams;

  console.log("🔄 PostLogin - Intended redirect:", intendedRedirect);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Not logged in - something went wrong, back to login
  if (!session) {
    console.log("❌ PostLogin - No session, redirecting to login");
    redirect("/login");
  }

  console.log("✅ PostLogin - User role:", session.user?.role);

  // ADMIN CHECK: Admin users always go to admin dashboard
  // This ensures admins land on their management interface
  if (session.user?.role === "admin") {
    console.log("👑 PostLogin - Admin user, redirecting to /admin");
    redirect("/admin");
  }

  // REGULAR USER: Go to intended destination or default to /courses
  const finalRedirect = intendedRedirect || "/courses";
  console.log("👤 PostLogin - Regular user, redirecting to:", finalRedirect);
  redirect(finalRedirect);
}
