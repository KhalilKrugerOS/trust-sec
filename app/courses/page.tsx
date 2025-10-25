import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CoursesPage() {
  // session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return <div>Courses will be listed here soon.</div>;
  } else {
    // redirect to login
    return redirect("/login");
  }
}
