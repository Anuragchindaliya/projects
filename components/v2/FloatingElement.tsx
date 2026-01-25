import { motion } from "framer-motion";
import React from "react";

interface FloatingElementProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    yOffset?: number;
}

export const FloatingElement = ({
    children,
    delay = 0,
    duration = 6,
    className,
    yOffset = -20,
}: FloatingElementProps) => {
    return (
        <motion.div
            className={className}
            animate={{
                y: [0, yOffset, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
            }}
        >
            {children}
        </motion.div>
    );
};
