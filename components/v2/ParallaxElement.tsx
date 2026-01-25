import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface ParallaxElementProps {
    children: React.ReactNode;
    speed?: number; // Negative for reverse direction
    className?: string;
}

export const ParallaxElement = ({ children, speed = 50, className }: ParallaxElementProps) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, speed]);

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
};
