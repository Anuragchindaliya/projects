import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-v2-primary text-white hover:bg-v2-primary/80",
                secondary:
                    "border-transparent bg-v2-secondary text-white hover:bg-v2-secondary/80",
                destructive:
                    "border-transparent bg-red-500 text-white hover:bg-red-500/80",
                outline: "text-foreground",
                glass:
                    "border-white/10 bg-white/5 text-v2-foreground hover:bg-white/10 hover:border-v2-primary/50 backdrop-blur-md",
            },
        },
        defaultVariants: {
            variant: "glass",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
