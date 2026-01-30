"use client";
import {
    motion,
    useScroll,
    useTransform
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { experienceString } from "utils";
import { LampContainer } from "./lamp";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height + 1000);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="w-full bg-white dark:bg-neutral-950 font-sans  relative overflow-hidden"
            ref={containerRef}
        >
            {/* Ambient Background Lighting */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-[10%] w-[500px] h-[400px] dark:bg-primary/20 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-[20%] w-[600px] h-[600px] dark:bg-primary/20 bg-primary/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto pt-8 sm:py-20 px-4 md:px-8 lg:px-10 relative z-10">
                <h2 className="text-4xl md:text-8xl mb-4 text-transparent bg-clip-text bg-gradient-to-b dark:from-white dark:via-white dark:to-primary-500 from-cyan-900 to-primary-500 max-w-4xl font-bold tracking-tight">
                    Projects
                </h2>
                <p className="text-cyan-900/90 dark:text-cyan-100/60 text-sm md:text-xl max-w-xl tracking-wide leading-relaxed">
                    Software engineer {experienceString}. A chronological journey through the digital void.
                </p>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start pt-10 md:pt-40 md:gap-10"
                    >
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            {/* Glass Node */}
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-xl bg-white/5 backdrop-blur-md border border-primary-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
                            </div>

                            {/* Holographic Year/Title */}
                            <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-purple-200 opacity-90">
                                {item.title}
                            </h3>
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-cyan-100">
                                {item.title}
                            </h3>
                            <div className="dark:text-neutral-300 text-xs">
                                {item.content}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Fiber Optic Beam Track */}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-800 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                >
                    {/* Active Beam */}
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-cyan-500 via-purple-500 to-transparent from-[0%] via-[10%] shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                    />
                </div>
            </div>
            <div className="w-full h-40 bg-gradient-to-b from-transparent to-gray-900 dark:to-gray-900 relative z-20 -mt-20 pointer-events-none" />
            <LampContainer>
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="mt-8 bg-gradient-to-br from-cyan-100 to-purple-200 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                    Thankyou for <br />
                    reading
                </motion.h1>
            </LampContainer>
        </div>
    );
};
