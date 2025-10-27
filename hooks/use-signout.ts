"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useSignout() {
  const router = useRouter();

  const handleSignout = async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Successfully logged out.");
          router.push("/login");
        },
        onError: () => {
          toast.error("Failed to log out. Please try again.");
        },
      },
    });
  };
  return handleSignout;
}
