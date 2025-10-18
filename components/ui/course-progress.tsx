import * as React from "react"
import { CheckCircle2, Circle, PlayCircle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const courseProgressVariants = cva(
    "flex items-center gap-[15px] w-full transition-all",
    {
        variants: {
            status: {
                locked: "opacity-100",
                available: "opacity-100 cursor-pointer hover:bg-slate-50",
                "in-progress": "bg-cyan-50 cursor-pointer hover:bg-cyan-100",
                completed: "bg-cyan-100 cursor-pointer hover:bg-cyan-200",
                "dark-locked": "bg-[#1a1047] opacity-100",
                "dark-available": "bg-[#1a1047] cursor-pointer hover:bg-[#221258]",
                "dark-in-progress": "bg-[#1a1047] cursor-pointer hover:bg-[#221258]",
                "dark-completed": "bg-[#1a1047] cursor-pointer hover:bg-[#221258]",
            },
        },
        defaultVariants: {
            status: "locked",
        },
    }
)

export interface CourseProgressItemProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof courseProgressVariants> {
    title: string
    duration: string
    status?: "locked" | "available" | "in-progress" | "completed" | "dark-locked" | "dark-available" | "dark-in-progress" | "dark-completed"
    onItemClick?: () => void
}

const CourseProgressItem = React.forwardRef<HTMLDivElement, CourseProgressItemProps>(
    (
        {
            className,
            status = "locked",
            title,
            duration,
            onItemClick,
            ...props
        },
        ref
    ) => {
        const isDark = status?.startsWith("dark")
        const baseStatus = status?.replace("dark-", "") as "locked" | "available" | "in-progress" | "completed"

        const getIcon = () => {
            const iconClass = "w-[26px] h-[26px]"
            const iconColor = isDark ? "text-white" : "text-trustsec-1"

            switch (baseStatus) {
                case "locked":
                    return <Circle className={cn(iconClass, isDark ? "text-white/40" : "text-slate-300")} strokeWidth={2} />
                case "available":
                    return <Circle className={cn(iconClass, iconColor)} strokeWidth={2} />
                case "in-progress":
                    return <PlayCircle className={cn(iconClass, "text-trustsec-3")} strokeWidth={2} fill="currentColor" />
                case "completed":
                    return <CheckCircle2 className={cn(iconClass, "text-trustsec-3")} strokeWidth={2} />
                default:
                    return <Circle className={cn(iconClass, iconColor)} strokeWidth={2} />
            }
        }

        const getTitleColor = () => {
            if (isDark) return "text-white"
            return "text-trustsec-1"
        }

        const getDurationColor = () => {
            if (isDark) return "text-white/80"
            return "text-slate-500"
        }

        return (
            <div
                ref={ref}
                className={cn(courseProgressVariants({ status, className }))}
                onClick={onItemClick}
                role={onItemClick ? "button" : undefined}
                tabIndex={onItemClick ? 0 : undefined}
                {...props}
            >
                <div className="shrink-0">
                    {getIcon()}
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className={cn(
                        "text-[18px] font-medium leading-[26px] truncate",
                        getTitleColor()
                    )}>
                        {title}
                    </h4>
                    <p className={cn(
                        "text-[15px] font-normal leading-[21px]",
                        getDurationColor()
                    )}>
                        {duration}
                    </p>
                </div>
            </div>
        )
    }
)
CourseProgressItem.displayName = "CourseProgressItem"

// Course Progress List Container
export interface CourseProgressListProps extends React.HTMLAttributes<HTMLDivElement> {
    items: Array<{
        id: string
        title: string
        duration: string
        status: CourseProgressItemProps["status"]
    }>
    onItemClick?: (id: string) => void
}

const CourseProgressList = React.forwardRef<HTMLDivElement, CourseProgressListProps>(
    ({ className, items, onItemClick, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("flex flex-col w-full", className)}
                {...props}
            >
                {items.map((item, index) => (
                    <CourseProgressItem
                        key={item.id}
                        title={item.title}
                        duration={item.duration}
                        status={item.status}
                        onItemClick={() => onItemClick?.(item.id)}
                        className={cn(
                            "py-4 px-4",
                            index !== items.length - 1 && "border-b border-slate-100"
                        )}
                    />
                ))}
            </div>
        )
    }
)
CourseProgressList.displayName = "CourseProgressList"

export { CourseProgressItem, CourseProgressList, courseProgressVariants }
