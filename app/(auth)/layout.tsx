import { ThemeToggle } from "@/components/ui/themeToggle";
import { NavButton } from "@/components/ui/nav-button";
import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";
import Logo from "@/public/layer_logo.png";
import BackgroundImage from "@/public/trust_sec_background.jpg";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
            {/* Background Image */}
            <Image
                src={BackgroundImage}
                alt="TrustSec Background"
                fill
                className="object-cover -z-10"
                priority
            />
            
            {/* Dark overlay for better contrast */}
            <div className="absolute inset-0 bg-black/40 -z-10" />

            <Link href="/" className="absolute left-4 top-4 z-20">
                <NavButton direction="previous" variant="active" />
            </Link>
            
            <div className="w-full max-w-sm flex flex-col gap-6 z-10 px-4">
                <Link href="/" className="flex justify-center items-center gap-2 self-center font-medium mb-4">
                    <Image
                        src={Logo}
                        alt="TrustSec Logo"
                        width={200}
                        height={160}
                        className="drop-shadow-2xl"
                    />
                </Link>
                {children}
            </div>
        </div>
    )
}