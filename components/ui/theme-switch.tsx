import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const themeSwitchVariants = cva(
    "inline-flex items-center gap-0 rounded-[12px] p-0",
    {
        variants: {
            theme: {
                light: "bg-slate-100",
                dark: "bg-gradient-to-r from-[#312e81] to-[#312e81]",
            },
        },
        defaultVariants: {
            theme: "light",
        },
    }
)

const buttonVariants = cva(
    "flex items-center justify-center p-[12px] rounded-[12px] transition-all duration-200",
    {
        variants: {
            active: {
                true: "bg-white shadow-[0px_1.5px_4.5px_0px_rgba(0,0,0,0.1),0px_1.5px_3px_-1.5px_rgba(0,0,0,0.1)]",
                false: "bg-transparent",
            },
            mode: {
                light: "",
                dark: "",
            },
        },
        compoundVariants: [
            {
                active: false,
                mode: "light",
                className: "opacity-50",
            },
            {
                active: false,
                mode: "dark",
                className: "bg-trustsec-1/35",
            },
        ],
        defaultVariants: {
            active: false,
            mode: "light",
        },
    }
)

export interface ThemeSwitchProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof themeSwitchVariants> {
    theme?: "light" | "dark"
    onChange?: (theme: "light" | "dark") => void
}

const ThemeSwitch = React.forwardRef<HTMLDivElement, ThemeSwitchProps>(
    ({ className, theme = "light", onChange, ...props }, ref) => {
        const [currentTheme, setCurrentTheme] = React.useState<"light" | "dark">(theme)

        React.useEffect(() => {
            setCurrentTheme(theme)
        }, [theme])

        const handleThemeChange = (newTheme: "light" | "dark") => {
            setCurrentTheme(newTheme)
            onChange?.(newTheme)
        }

        return (
            <div
                ref={ref}
                className={cn(themeSwitchVariants({ theme: currentTheme, className }))}
                {...props}
            >
                {/* Light Mode Button */}
                <button
                    onClick={() => handleThemeChange("light")}
                    className={cn(
                        buttonVariants({
                            active: currentTheme === "light",
                            mode: currentTheme,
                        })
                    )}
                    aria-label="Switch to light mode"
                    type="button"
                >
                    <Sun
                        className={cn(
                            "w-[25px] h-[25px]",
                            currentTheme === "light" ? "text-trustsec-2" : "text-white/50"
                        )}
                        strokeWidth={2}
                    />
                </button>

                {/* Dark Mode Button */}
                <button
                    onClick={() => handleThemeChange("dark")}
                    className={cn(
                        buttonVariants({
                            active: currentTheme === "dark",
                            mode: currentTheme,
                        })
                    )}
                    aria-label="Switch to dark mode"
                    type="button"
                >
                    <Moon
                        className={cn(
                            "w-[25px] h-[25px]",
                            currentTheme === "dark" ? "text-trustsec-3" : currentTheme === "light" ? "text-slate-400" : "text-white"
                        )}
                        strokeWidth={2}
                        fill={currentTheme === "dark" ? "currentColor" : "none"}
                    />
                </button>
            </div>
        )
    }
)
ThemeSwitch.displayName = "ThemeSwitch"

export { ThemeSwitch, themeSwitchVariants }
