"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, Suspense } from "react";
import { toast } from "sonner";

/**
 * ADMIN REDIRECT LOGIC
 * ====================
 * After successful OTP verification, we check if the user is an admin.
 * - Admin users → Always redirect to /admin dashboard
 * - Regular users → Redirect to intended page or /courses
 *
 * This ensures admins land on their management interface while
 * regular users continue to the courses or their originally intended page.
 */
async function getPostLoginRedirect(
  intendedRedirect?: string | null
): Promise<string> {
  const DEFAULT_REDIRECT = "/courses";
  const ADMIN_REDIRECT = "/admin";

  try {
    const session = await authClient.getSession();
    console.log("✅ VerifyEmail - User role:", session.data?.user?.role);

    // Admin users always go to admin dashboard
    if (session.data?.user?.role === "admin") {
      console.log("👑 VerifyEmail - Admin user, redirecting to /admin");
      return ADMIN_REDIRECT;
    }

    // Regular users go to intended destination or courses
    console.log(
      "👤 VerifyEmail - Regular user, redirecting to:",
      intendedRedirect || DEFAULT_REDIRECT
    );
    return intendedRedirect || DEFAULT_REDIRECT;
  } catch (error) {
    console.error("❌ VerifyEmail - Error getting session:", error);
    return intendedRedirect || DEFAULT_REDIRECT;
  }
}

function VerifyEmailContent() {
  const [otp, setOtp] = useState("");
  const [isOtpPending, startOtpTransition] = useTransition();
  const params = useSearchParams();
  const email = params.get("email");
  const redirectTo = params.get("redirect");
  const router = useRouter();

  // Debug log
  console.log("🔄 VerifyEmail - redirect param:", redirectTo);

  function verifyEmail() {
    console.log("Verifying email with OTP:", otp, "for email:", email);
    startOtpTransition(async () => {
      authClient.signIn.emailOtp({
        otp: otp,
        email: email as string,
        fetchOptions: {
          onSuccess: async () => {
            toast.success("Email verified successfully!");
            // Check if user is admin and redirect accordingly
            const finalRedirect = await getPostLoginRedirect(redirectTo);
            router.push(finalRedirect);
          },
          onError: (error) => {
            toast.error("Failed to verify email.", {
              description: error.error.message,
            });
            // TODO: Optionally clear OTP input
          },
        },
      });
    });
  }
  return (
    <Card className="w-full mx-auto space-y-6">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl mb-2">Check your email</CardTitle>
        <CardDescription>
          We have sent a verification link to your email address. Please check
          your inbox and click on the link to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto text-center">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            className="gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="mt-4 text-sm text-muted-foreground">
            enter the 6-digit code we just emailed you.
          </p>
          <Button
            className="mt-6 w-full"
            onClick={verifyEmail}
            disabled={isOtpPending || otp.length < 6}
          >
            {isOtpPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span> Verifying...</span>
              </>
            ) : (
              "Verify Account"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function VerifyRequestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
