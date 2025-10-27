"use client";

import { Button } from "@/components/ui/button";
import useSignout from "@/hooks/use-signout";

export default function LogoutButton() {
  const handleSignout = useSignout();

  return (
    <Button onClick={handleSignout} variant="outline">
      Logout
    </Button>
  );
}
