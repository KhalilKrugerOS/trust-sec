"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="flex gap-[6.168px] items-center p-[6.168px] rounded-[15.421px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(49, 46, 129, 1) 0%, rgba(49, 46, 129, 1) 100%)",
        }}
      >
        <button className="flex items-center justify-center p-[12.337px] rounded-[15.421px] bg-white shadow-[0px_1.542px_4.626px_0px_rgba(0,0,0,0.1),0px_1.542px_3.084px_-1.542px_rgba(0,0,0,0.1)]">
          <Sun className="h-[24.674px] w-[24.674px] text-gray-900" />
        </button>
        <button className="flex items-center justify-center p-[12.337px] rounded-[15.421px] bg-transparent">
          <Moon className="h-[24.674px] w-[24.674px] text-white" />
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex h-[40px] gap-[6.168px] m-0 items-center p-[6.168px] rounded-[15.421px]"
      style={{
        background:
          "linear-gradient(90deg, rgba(49, 46, 129, 1) 0%, rgba(49, 46, 129, 1) 100%)",
      }}
    >
      {/* Light Mode Button */}
      <button
        onClick={() => setTheme("light")}
        className={`flex items-center justify-center p-[6.168px] rounded-[15.421px] transition-all duration-200 ${
          theme === "light"
            ? "bg-white shadow-[0px_1.542px_4.626px_0px_rgba(0,0,0,0.1),0px_1.542px_3.084px_-1.542px_rgba(0,0,0,0.1)]"
            : "bg-transparent hover:bg-white/10"
        }`}
        aria-label="Switch to light mode"
      >
        <Sun
          className={`h-[24.674px] w-[24.674px] transition-colors ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        />
      </button>

      {/* Dark Mode Button */}
      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center justify-center p-[6.168px] rounded-[15.421px] transition-all duration-200 ${
          theme === "dark"
            ? "bg-[var(--trustsec-1,#080056)] shadow-[0px_1.542px_4.626px_0px_rgba(0,0,0,0.1),0px_1.542px_3.084px_-1.542px_rgba(0,0,0,0.1)]"
            : "bg-transparent hover:bg-white/10"
        }`}
        aria-label="Switch to dark mode"
      >
        <Moon className="h-[24.674px] w-[24.674px] text-white" />
      </button>
    </div>
  );
}
