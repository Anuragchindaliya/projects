"use client";

import caseStudies from "@/components/CaseStudyLayout/data";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { SparklesCore } from "@/components/ui/sparkles";
import { useThemeColor } from "@/components/ui/theme-color-provider";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
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

export default function CaseStudyPage() {
    const router = useRouter();
    const { slug } = router.query;
    const { themeColor } = useThemeColor();
    const accentColor = colorMap[themeColor] || "#2563eb";
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const headerY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    if (!slug) return null; // Or a loading spinner

    const study = caseStudies.find((item) => item.slug === slug as string);

    if (!study) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background text-foreground">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">404 - Lost in Void</h1>
                    <Link href="/case-studies" className="text-primary hover:underline">Return to Base</Link>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative w-full min-h-screen bg-background selection:bg-primary selection:text-white overflow-x-hidden">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent z-50 origin-left"
                style={{ scaleX }}
            />

            {/* Background - Theme Aware */}
            <div className="fixed inset-0 w-full h-full pointer-events-none">
                <SparklesCore
                    id="tsparticlescasestudy"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={70}
                    className="w-full h-full"
                    particleColor={accentColor}
                />
                {/* Light/Dark mode fog handling */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none dark:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white pointer-events-none dark:hidden block" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-6 left-6 z-50">
                <Link href="/case-studies">
                    <motion.button
                        whileHover={{ scale: 1.05, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all 
                        bg-white/80 border border-gray-200 text-gray-700 shadow-sm hover:bg-white
                        dark:bg-white/5 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white backdrop-blur-md"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Lab
                    </motion.button>
                </Link>
            </nav>

            <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 w-full max-w-7xl mx-auto perspective-[1000px]">

                {/* Hero Headers */}
                <motion.div
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="text-center mb-32 space-y-6"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="inline-block"
                    >
                        <span className="px-3 py-1 rounded-full border bg-white/50 border-gray-200 text-primary-600 
                        dark:bg-white/5 dark:border-white/10 dark:text-primary-400 
                        text-xs tracking-[0.2em] uppercase mb-4 inline-block backdrop-blur-md shadow-sm">
                            Case Study
                        </span>
                    </motion.div>

                    <h1 className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b 
                    from-gray-900 via-gray-700 to-gray-400 
                    dark:from-white dark:via-white/90 dark:to-white/40 
                    tracking-tighter drop-shadow-sm dark:drop-shadow-2xl">
                        {study.title}
                    </h1>

                    {study.subtitle && (
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-muted-foreground/90 max-w-3xl mx-auto font-light leading-relaxed">
                            {study.subtitle}
                        </p>
                    )}
                </motion.div>

                {/* Content Grid */}
                <div className="space-y-24">

                    {/* Problem & Solution Panel */}
                    <GlassPanel title="The Challenge" delay={0.2}>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {study.problem}
                        </p>
                    </GlassPanel>

                    <div className="grid grid-cols-1 gap-8">
                        {/* Description Panel */}
                        <GlassPanel title="Overview" delay={0.3} className="h-full">
                            <p className="text-muted-foreground leading-relaxed">
                                {study.description}
                            </p>
                        </GlassPanel>

                        {/* Tech Stack Panel */}
                        {/* <GlassPanel title="Technologies" delay={0.4} className="h-full">
                            <div className="flex flex-wrap gap-3">
                                {study.techStack?.map((tech: string, i: number) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.05 * i }}
                                        whileHover={{ scale: 1.1, rotate: 2 }}
                                        className="px-4 py-2 rounded-lg bg-foreground/5 border border-foreground/10 text-sm text-foreground/80 hover:bg-primary/20 hover:border-primary/30 transition-colors cursor-default"
                                    >
                                        {tech}
                                    </motion.span>
                                )) || <p className="text-muted-foreground italic">Technology stack not specified.</p>}
                            </div>
                        </GlassPanel> */}
                    </div>

                    {/* How It Works Section */}
                    {study.howItWorks && study.howItWorks.length > 0 && (
                        <GlassPanel title="How It Works" delay={0.45}>
                            <div className="space-y-4">
                                {study.howItWorks.map((step: string, i: number) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono mt-1 ring-1 ring-primary/20">
                                            {i + 1}
                                        </span>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </GlassPanel>
                    )}

                    {/* Code / Installation */}
                    {(study.installation || study.usage) && (
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                            <GlassPanel title="Implementation" delay={0.5} noPadding>
                                <div className="p-1 bg-card/40 rounded-xl overflow-hidden">
                                    <div className="flex items-center gap-2 px-4 py-3 bg-foreground/5 border-b border-foreground/5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                        <span className="ml-2 text-xs text-muted-foreground font-mono">deployment-terminal</span>
                                    </div>
                                    <div className="p-6 space-y-8">
                                        {study.installation && (
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Installation</h4>
                                                <CodeBlock
                                                    code={study.installation.code || ""}
                                                    language={study.installation.language || "bash"}
                                                    filename={study.installation.filePath || "terminal"}
                                                />
                                            </div>
                                        )}
                                        {study.usage && (
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Usage</h4>
                                                <CodeBlock
                                                    code={study.usage}
                                                    language="tsx"
                                                    filename="Example.tsx"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </GlassPanel>
                        </div>
                    )}

                    {/* Code Blocks */}
                    {study.codeBlocks && study.codeBlocks.length > 0 && (
                        <div className="space-y-12">
                            {study.codeBlocks.map((block, idx) => (
                                <GlassPanel key={idx} title={block.title} delay={0.2} noPadding>
                                    <div className="p-1 bg-card/40 rounded-xl">
                                        {'tabs' in block && block.tabs ? (
                                            <CodeBlock
                                                tabs={block.tabs.map((t) => ({
                                                    name: t.name,
                                                    code: t.code,
                                                    language: t.language || "tsx",
                                                    highlightLines: t.highlightLines || [],
                                                }))}
                                            />
                                        ) : (
                                            <CodeBlock
                                                code={block.code || ""}
                                                language={block.language || "tsx"}
                                                filename={block.filePath}
                                                highlightLines={block.highlightLines || []}
                                            />
                                        )}
                                    </div>
                                </GlassPanel>
                            ))}
                        </div>
                    )}

                    {/* Developer Notes Section */}
                    {study.devNotes && study.devNotes.length > 0 && (
                        <GlassPanel title="Developer Notes" delay={0.55}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {study.devNotes.map((note: string, i: number) => (
                                    <div key={i} className="p-4 rounded-lg bg-foreground/5 border border-foreground/5 text-sm text-muted-foreground font-mono flex gap-3">
                                        <span className="text-primary select-none">$</span>
                                        <span>{note}</span>
                                    </div>
                                ))}
                            </div>
                        </GlassPanel>
                    )}

                    {/* Impact / Stats */}
                    {study.impact && (
                        <GlassPanel title="Impact & Results" delay={0.6}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {study.impact.map((text, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        className="p-6 rounded-xl bg-foreground/5 border border-foreground/5 hover:bg-foreground/10 transition-colors"
                                    >
                                        <h3 className="text-4xl font-bold text-foreground mb-2">{i + 1}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </GlassPanel>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-32 text-center pb-20">
                    <p className="text-muted-foreground mb-8">Ready to see more?</p>
                    <Link href="/case-studies">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-lg transition-shadow"
                        >
                            Explore Case Lab
                        </motion.button>
                    </Link>
                </div>

            </main>
        </div>
    );
}

const GlassPanel = ({
    title,
    children,
    className = "",
    delay = 0,
    noPadding = false
}: {
    title?: string,
    children: React.ReactNode,
    className?: string,
    delay?: number,
    noPadding?: boolean
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={`rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-black/20 backdrop-blur-md shadow-sm dark:shadow-none ${className}`}
        >
            {title && (
                <div className="px-8 py-6 border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-white/5 backdrop-blur-md">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h3>
                </div>
            )}
            <div className={noPadding ? "" : "p-8 bg-gray-50/50 dark:bg-white/5"}>
                {children}
            </div>
        </motion.div>
    );
};
