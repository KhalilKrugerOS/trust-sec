import { redirect } from "next/navigation";
import LoginForm from "./_components/LoginForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirect: redirectTo } = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect(redirectTo || "/courses");
  }

  return <LoginForm redirectTo={redirectTo} />;
}
