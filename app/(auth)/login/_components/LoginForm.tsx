"use client"; // bc of useTransition

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Mail, Send } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  redirectTo?: string;
}

export default function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isGoogleAuthPending, startGoogleAuthTransition] = useTransition();
  const [isEmailAuthPending, startEmailAuthTransition] = useTransition(); // use Transition is useful for pending states

  /**
   * CALLBACK URL STRATEGY
   * =====================
   * Instead of redirecting directly to the intended page,
   * we go through /auth/post-login which:
   * 1. Checks if user is admin → redirects to /admin
   * 2. Otherwise → redirects to intended page or /courses
   *
   * This allows role-based redirects after OAuth completes.
   */
  const callbackURL = redirectTo
    ? `/auth/post-login?redirect=${encodeURIComponent(redirectTo)}`
    : `/auth/post-login`;

  // Debug: Log redirect values
  console.log("🔄 LoginForm redirectTo prop:", redirectTo);
  console.log("🔄 LoginForm callbackURL:", callbackURL);

  async function handleGoogleSignIn() {
    startGoogleAuthTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL, // Redirect after successful login
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully signed in with Google!");
          },
          onError: (error) => {
            toast.error("Failed to sign in with Google.", {
              description: error.error.message,
            });
          },
        },
      });
    });
  }

  function handleEmailSignIn() {
    startEmailAuthTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Verification email sent!", {
              description: `Check your inbox for a verification link.`,
            });
            // setEmail(""); // Optionally clear email input
            const verifyUrl = `/verify-email?email=${encodeURIComponent(
              email
            )}${
              redirectTo ? `&redirect=${encodeURIComponent(redirectTo)}` : ""
            }`;
            router.push(verifyUrl);
          },
          onError: (error) => {
            toast.error("Failed to send verification email.", {
              description: error.error.message,
            });
          },
        },
      });
    });
  }

  return (
    <Card className="w-full backdrop-blur-xl bg-card/80 dark:bg-trustsec-widget/80 border-trustsec-3/30 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl"> Welcome Back </CardTitle>
        <CardDescription>Login With Email</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          disabled={isGoogleAuthPending} // Disable button while auth is pending
          className="w-full"
          variant="outline"
          onClick={handleGoogleSignIn}
        >
          {isGoogleAuthPending ? (
            <>
              <Loader className="size-4 animate-spin" />
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              Sign in with Google
            </>
          )}
        </Button>
        <div
          className="relative text-center text-sm after:absolute
                after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
        >
          <span className="relative text-muted-foreground z-10 bg-card px-2">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="flen.fouleni@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              className="w-full"
              onClick={handleEmailSignIn}
              disabled={isEmailAuthPending}
            >
              {isEmailAuthPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" /> <span>Continue with Email</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
