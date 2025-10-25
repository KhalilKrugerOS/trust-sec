"use client"; // bc of useTransition

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Mail } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useTransition } from "react";

export default function LoginForm() {

    const [isGoogleAuthPending, startGoogleAuthTransition] = useTransition();

    async function handleGoogleSignIn() {

        startGoogleAuthTransition(async () => {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/courses", // Redirect after successful login
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Successfully signed in with Google!");
                    },
                    onError: (error) => {
                        toast.error("Failed to sign in with Google.", { description: error.error.message });
                    }
                }
            });
        });
    };
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
                    { isGoogleAuthPending ? 
                        <>
                           <Loader className="size-4 animate-spin" />
                        </> : 
                        <>  
                            <Mail className="w-4 h-4" />
                            Sign in with Google
                        </>
                    }
                </Button>
                <div className="relative text-center text-sm after:absolute
                after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">

                    <span className="relative text-muted-foreground z-10 bg-card px-2">
                        Or continue with
                    </span>
                </div>

                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="email">
                            Email
                        </Label>
                        <Input
                            type="email"
                            placeholder="flex.fouleni@exmaple.com"
                            />
                    <Button className="w-full">
                        Continue with Email
                    </Button>     
                    </div>
                   
                </div>

            </CardContent>
        </Card >
    )
}