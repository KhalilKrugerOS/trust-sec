"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/themeToggle";

export function PublicNavbar() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-trustsec-1/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="dark:bg-white dark:rounded-lg dark:px-3 dark:py-1">
              <Image
                src="/layer_logo.png"
                alt="TrustSec"
                width={200}
                height={128}
                className="h-20 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Right Side: Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
