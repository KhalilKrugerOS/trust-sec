import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "previous" | "next"
  variant?: "default" | "active"
}

const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ className, direction, variant = "default", disabled, ...props }, ref) => {
    const isPrevious = direction === "previous"
    
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center gap-[10.3px] font-['Montserrat'] font-medium text-[18.024px] leading-[25.749px] transition-all rounded-md px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring",
          variant === "active" 
            ? "text-white hover:opacity-90" 
            : "text-trustsec-1/50 dark:text-white/50 hover:text-trustsec-1 dark:hover:text-white",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {isPrevious && (
          <ChevronLeft 
            className="h-[20.599px] w-[20.599px]" 
            strokeWidth={2.5}
          />
        )}
        <span className="whitespace-nowrap">
          {isPrevious ? "Previous" : "Next"}
        </span>
        {!isPrevious && (
          <ChevronRight 
            className="h-[20.599px] w-[20.599px]" 
            strokeWidth={2.5}
          />
        )}
      </button>
    )
  }
)

NavButton.displayName = "NavButton"

export { NavButton }
