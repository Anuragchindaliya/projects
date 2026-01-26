"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export const KineticTypography = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const springConfig = { stiffness: 50, damping: 30, restDelta: 0.001 };
    const smoothProgress = useSpring(scrollYProgress, springConfig);

    const x1 = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
    const x2 = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex flex-col justify-center items-center"
            style={{ perspective: "1000px" }}
        >
            {/* Cinematic Fog / Glow Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/20 to-neutral-950/80 z-10 pointer-events-none" />

            {/* Anamorphic Lens Flare Simulation */}
            <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [1, 1.2, 1], x: ["-10%", "10%", "-10%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-0 w-[120%] h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent blur-md z-0 transform -rotate-[5deg]"
            />

            <motion.div
                style={{ x: x1, rotateX: 10, opacity: 0.15 }}
                animate={{ y: [0, -20, 0] }} // Drone-like floating
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="text-[12vw] font-black uppercase whitespace-nowrap leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-500 to-neutral-800 dark:from-neutral-600 dark:to-neutral-900 blur-[1px]"
            >
                Creative Developer
            </motion.div>

            <motion.div
                style={{ x: x2, rotateX: 10, opacity: 0.3 }}
                animate={{ y: [0, 30, 0] }} // Drone-like floating (reverse phase)
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="text-[15vw] font-black uppercase whitespace-nowrap leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl z-20 ml-20"
            >
                Frontend Engineer
            </motion.div>

            <motion.div
                style={{ x: x1, rotateX: 10, opacity: 0.15 }}
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="text-[12vw] font-black uppercase whitespace-nowrap leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-400 to-neutral-800 dark:from-neutral-600 dark:to-neutral-900 blur-[1px]"
            >
                React Expert
            </motion.div>
        </div>
    );
};
