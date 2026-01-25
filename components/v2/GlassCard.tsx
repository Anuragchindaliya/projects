import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

// If utility doesn't exist, I'll just fallback to simple string concat in this file for now to be safe
const classNames = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

interface GlassCardProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard = ({ children, className, hoverEffect = false, ...props }: GlassCardProps) => {
    return (
        <motion.div
            initial={hoverEffect ? { y: 0 } : undefined}
            whileHover={hoverEffect ? { y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' } : undefined}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={classNames(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg",
                // Additional utility for specific v2 styling if defined in tailwind
                // "border-v2-glass-border",
                className
            )}
            {...props}
        >
            {/* Optional: Glossy reflection gradient overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 to-transparent opacity-50" />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};
