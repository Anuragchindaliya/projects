"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const KineticTypography = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex flex-col justify-center items-center opacity-10 dark:opacity-[0.03]"
        >
            <motion.div
                style={{ x: x1, rotate: -5 }}
                className="text-[15vw] font-black uppercase whitespace-nowrap text-gray-900 dark:text-white leading-none tracking-tighter"
            >
                Creative Developer
            </motion.div>
            <motion.div
                style={{ x: x2, rotate: 5 }}
                className="text-[15vw] font-black uppercase whitespace-nowrap text-gray-900 dark:text-white leading-none tracking-tighter ml-32"
            >
                Frontend Engineer
            </motion.div>
            <motion.div
                style={{ x: x1, rotate: -2 }}
                className="text-[12vw] font-black uppercase whitespace-nowrap text-gray-900 dark:text-white leading-none tracking-tighter"
            >
                React Expert
            </motion.div>
        </div>
    );
};
