import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import Image from "next/image"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"

const cardVariants = cva(
    "flex flex-col w-full rounded-[13.5px] overflow-hidden transition-all",
    {
        variants: {
            variant: {
                default: "bg-white",
                outlined: "bg-white border border-trustsec-2 shadow-lg pb-[104px]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface CourseCardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
    image: string
    title: string
    description: string
    duration: string
    level?: "Beginner" | "Intermediate" | "Advanced"
    isFavorite?: boolean
    onFavoriteClick?: () => void
    actionButton?: React.ReactNode
}

const CourseCard = React.forwardRef<HTMLDivElement, CourseCardProps>(
    (
        {
            className,
            variant,
            image,
            title,
            description,
            duration,
            level = "Beginner",
            isFavorite = false,
            onFavoriteClick,
            actionButton,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(cardVariants({ variant, className }))}
                {...props}
            >
                {/* Image Container */}
                <div className="relative h-[259px] w-full overflow-hidden rounded-t-[13.5px]">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />

                    {/* Favorite Button */}
                    <button
                        onClick={onFavoriteClick}
                        className="absolute left-[22px] top-[22px] backdrop-blur-[5.4px] bg-white/90 p-[11px] rounded-full hover:bg-white transition-colors"
                    >
                        <svg
                            className="w-[27px] h-[27px]"
                            viewBox="0 0 24 24"
                            fill={isFavorite ? "#114ef6" : "none"}
                            stroke={isFavorite ? "#114ef6" : "#080056"}
                            strokeWidth="2"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>

                    {/* Level Badge */}
                    <div className="absolute right-[22px] top-[22px] backdrop-blur-[5.4px] bg-white/90 px-[12px] py-[3.6px] rounded-[11px]">
                        <p className="text-trustsec-1 text-[16px] font-medium leading-[22px]">
                            {level}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-[11px] p-[30px]">
                    {/* Title */}
                    <h3 className={cn(
                        "text-[27px] font-semibold leading-[38px]",
                        variant === "outlined" ? "text-trustsec-2" : "text-trustsec-1"
                    )}>
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-[19px] text-slate-500 leading-[27px]">
                        {description}
                    </p>

                    {/* Duration */}
                    <div className="flex items-center gap-[5.4px]">
                        <Clock className="w-[22px] h-[22px] text-slate-500" strokeWidth={2} />
                        <span className="text-[19px] text-slate-500 leading-[27px]">
                            {duration}
                        </span>
                    </div>
                </div>

                {/* Action Button */}
                {actionButton && (
                    <div className="px-[30px] pb-[30px] w-full">
                        {actionButton}
                    </div>
                )}
            </div>
        )
    }
)
CourseCard.displayName = "CourseCard"

// Simple Card components for general use
const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-[13.5px] bg-white shadow-sm",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-slate-500", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    CourseCard,
}
