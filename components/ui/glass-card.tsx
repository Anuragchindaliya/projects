import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}

export const GlassCard = ({
    children,
    className,
    containerClassName,
}: GlassCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // 3D Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={cn(
                "relative group/card cursor-pointer",
                containerClassName
            )}
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className={cn(
                    "w-full p-2 relative overflow-hidden", // Reduced padding
                    "rounded-xl border border-white/20",
                    "bg-gradient-to-br from-neutral-300 via-neutral-100 to-neutral-200 dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-800", // Metallic gradient
                    "shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_0_rgba(255,255,255,0.05)]", // Metallic shadow
                    "group-hover/card:shadow-[0_8px_24px_0_rgba(0,0,0,0.2)] dark:group-hover/card:shadow-[0_8px_24px_0_rgba(255,255,255,0.1)]",
                    "transition-all duration-300",
                    className
                )}
            >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(110deg,transparent,45%,rgba(255,255,255,0.5),55%,transparent)] bg-[length:200%_100%] transition-opacity duration-500 opacity-0 group-hover/card:opacity-50 animate-shimmerOne group-hover/card:animate-shimmer pointer-events-none mix-blend-overlay dark:mix-blend-color-dodge" />

                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};
