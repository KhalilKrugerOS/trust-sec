import * as React from "react"
import NextLink from "next/link"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const linkVariants = cva(
    "inline-flex items-center justify-center rounded-[11px] px-8 py-3.5 text-center font-medium text-[19px] leading-[27px] shadow-[0px_1.35px_2.7px_0px_rgba(0,0,0,0.05)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-trustsec-2 text-white hover:bg-trustsec-2/90",
                dark: "bg-[#1749d4] text-white hover:bg-[#1749d4]/90",
                outline: "border border-slate-200 text-trustsec-1/50 shadow-none hover:bg-slate-100",
                ghost: "border border-slate-200 text-white shadow-none hover:bg-white/10",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface LinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
    href: string
    children?: React.ReactNode
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
    ({ className, variant, href, children, ...props }, ref) => {
        return (
            <NextLink
                href={href}
                className={cn(linkVariants({ variant, className }))}
                ref={ref}
                {...props}
            >
                {children || "Join Session"}
            </NextLink>
        )
    }
)
Link.displayName = "Link"

export { Link, linkVariants }
