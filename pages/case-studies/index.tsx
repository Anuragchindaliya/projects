"use client";

import data from "@/components/CaseStudyLayout/data";
import { SparklesCore } from "@/components/ui/sparkles";
import { useThemeColor } from "@/components/ui/theme-color-provider";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const colorMap: Record<string, string> = {
    neutral: "#525252",
    zinc: "#52525b",
    slate: "#475569",
    blue: "#2563eb",
    violet: "#7c3aed",
    green: "#16a34a",
    orange: "#ea580c",
    gray: "#4b5563",
};

export default function CaseStudyListPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { themeColor } = useThemeColor();
    const accentColor = colorMap[themeColor] || "#ffffff";

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

    return (
        <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-gray-50 dark:bg-black selection:bg-primary selection:text-white">
            {/* Zero-Gravity Void Background */}
            <div className="fixed inset-0 w-full h-full pointer-events-none">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor={accentColor}
                />
                {/* Cinematic Fog Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/80 dark:from-black dark:via-transparent dark:to-black opacity-80 z-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 dark:from-black/50 dark:via-transparent dark:to-black/50 z-0" />
            </div>

            <main className="relative z-10 flex flex-col items-center pt-32 pb-20 px-4 md:px-12 w-full max-w-7xl mx-auto perspective-[1000px]">
                {/* Kinetic Title Drifting */}
                <motion.div
                    style={{ y, rotateX: rotate }}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center mb-24 relative"
                >
                    <h1 className="text-6xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-900 via-gray-600 to-gray-400 dark:from-white dark:via-white/80 dark:to-white/20 tracking-tighter mix-blend-darken dark:mix-blend-difference z-20 relative">
                        CASE LAB
                    </h1>
                    <div className="absolute -inset-10 bg-primary/10 dark:bg-primary/20 blur-[100px] z-10 rounded-full opacity-30 animate-pulse" />
                    <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-muted-foreground/80 max-w-2xl mx-auto tracking-wide font-light">
                        Explorations in digital engineering and interface design.
                    </p>
                </motion.div>

                {/* 3D Floating Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {data.map((study, index) => (
                        <FloatingCard key={study.slug} study={study} index={index} accentColor={accentColor} />
                    ))}
                </div>

                {/* Bottom Decorative Element */}
                <div className="mt-32 relative w-full flex justify-center opacity-30">
                    <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-gray-400 dark:via-white to-transparent" />
                </div>
            </main>
        </div>
    );
}

const FloatingCard = ({ study, index, accentColor }: { study: any, index: number, accentColor: string }) => {
    // Randomize float duration slightly for organic feel
    const randomDuration = 4 + Math.random() * 2;
    const randomDelay = Math.random() * 2;

    return (
        <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            className="group relative h-full perspective-[1000px]"
        >
            {/* Drifting content wrapper */}
            <motion.div
                animate={{
                    y: [0, -15, 0],
                    rotateZ: [0, index % 2 === 0 ? 1 : -1, 0]
                }}
                transition={{
                    duration: randomDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: randomDelay
                }}
                className="h-full"
            >
                <Link href={`/case-studies/${study.slug}`} className="block h-full">
                    <div className="rounded-2xl p-8 h-full relative overflow-hidden transition-all duration-500 bg-white/40 border border-gray-200 dark:bg-white/5 dark:border-white/10 hover:shadow-xl dark:hover:bg-white/10 backdrop-blur-sm">
                        {/* Hover Gradient Shine */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
                            style={{
                                background: `radial-gradient(600px circle at var(--mouse-x, center) var(--mouse-y, center), ${accentColor}11, transparent 40%)`
                            }}
                        />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-xs font-mono text-gray-500 dark:text-muted-foreground/60 tracking-[0.2em] uppercase border border-gray-300 dark:border-white/5 px-2 py-1 rounded">
                                    0{index + 1}
                                </span>
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 45 }}
                                    className="w-8 h-8 rounded-full border border-gray-300 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-white/50 group-hover:text-black dark:group-hover:text-white group-hover:border-gray-500 dark:group-hover:border-white/30 transition-colors"
                                >
                                    ↗
                                </motion.div>
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300">
                                {study.title}
                            </h2>
                            <p className="text-gray-600 dark:text-muted-foreground/80 line-clamp-3 mb-8 leading-relaxed font-light">
                                {study.description}
                            </p>

                            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/5 flex gap-3 text-xs font-medium text-gray-500 dark:text-muted-foreground/50">
                                {study.techStack?.slice(0, 3).map((tech: string) => (
                                    <span key={tech} className="bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full group-hover:bg-primary/10 dark:group-hover:bg-white/10 group-hover:text-primary dark:group-hover:text-white/80 transition-colors">
                                        {tech}
                                    </span>
                                ))}
                                {study.techStack?.length > 3 && (
                                    <span className="px-1 py-1">+ {study.techStack.length - 3}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>
        </motion.div>
    );
}
