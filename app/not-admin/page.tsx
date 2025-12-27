import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldAlert, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function NotAdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto size-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldAlert className="size-8 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
            <CardDescription className="mt-2">
              You don&apos;t have permission to access this page
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-sm">
              Administrator Access Required
            </h3>
            <p className="text-sm text-muted-foreground">
              This page is restricted to administrators only. If you believe you
              should have access, please contact support.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="size-4 mr-2" />
                Back to Home
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/contact">
                <Mail className="size-4 mr-2" />
                Contact Support
              </Link>
            </Button>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-center text-muted-foreground">
              Error Code: 403 - Forbidden
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
