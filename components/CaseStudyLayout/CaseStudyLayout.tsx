"use client";

import { CodeBlock } from "@/components/ui/CodeBlock";
import { motion } from "framer-motion";
import Link from "next/link";
import { CaseStudy } from "./types/case-study";

interface Props {
    data: CaseStudy;
}

export default function CaseStudyLayout({ data }: Props) {
    return (
        <section className="py-20 max-w-4xl mx-auto px-4 space-y-20">

            {/* HERO */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold">{data.title}</h1>

                {data.subtitle && (
                    <p className="text-lg text-muted-foreground mt-2">
                        {data.subtitle}
                    </p>
                )}

                <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
                    {data.description}
                </p>
            </motion.div>

            {/* PROBLEM */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <h2 className="text-2xl font-semibold">Problem</h2>
                <p className="text-muted-foreground">{data.problem}</p>
            </motion.div>

            {/* DEMO */}
            {data.demo && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h2 className="text-2xl font-semibold">Demo Preview</h2>
                    <div
                        className="rounded-xl border p-6 shadow-sm bg-card"
                        dangerouslySetInnerHTML={{ __html: data.demo }}
                    ></div>
                </motion.div>
            )}

            {/* INSTALLATION */}
            {data.installation && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Installation</h2>

                    <CodeBlock
                        code={data.installation.code || ""}
                        language={data.installation.language || "bash"}
                        filename={data.installation.filePath || "install.sh"}
                    />
                </div>
            )}

            {/* CODE BLOCKS */}
            {data.codeBlocks && data.codeBlocks.length > 0 && (
                <div className="space-y-12">
                    {data.codeBlocks.map((block, idx) => (
                        <div key={idx} className="space-y-3">
                            <h2 className="text-xl font-semibold">{block.title}</h2>

                            {/* Tabbed code blocks */}
                            {"tabs" in block && Array.isArray(block.tabs) && (
                                <CodeBlock
                                    tabs={block.tabs.map((t) => ({
                                        name: t.name,
                                        code: t.code,
                                        language: t.language || "tsx",
                                        highlightLines: t.highlightLines || [],
                                    }))}
                                />
                            )}

                            {/* Single Block */}
                            {"code" in block && block.code && (
                                <CodeBlock
                                    filename={block.filePath}
                                    language={block.language || "tsx"}
                                    code={block.code}
                                    highlightLines={block.highlightLines || []}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* USAGE EXAMPLE */}
            {data.usage && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Usage Example</h2>
                    <CodeBlock
                        filename="usage-example.tsx"
                        language="tsx"
                        code={data.usage}
                    />
                </div>
            )}

            {/* HOW IT WORKS */}
            {data.howItWorks && data.howItWorks.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">How It Works</h2>

                    <ul className="space-y-3">
                        {data.howItWorks.map((step, i) => (
                            <li key={i} className="flex gap-3">
                                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    {i + 1}
                                </span>
                                <p className="text-muted-foreground">{step}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* DEV NOTES */}
            {data.devNotes && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Developer Notes</h2>
                    <ul className="space-y-2 text-muted-foreground">
                        {data.devNotes.map((note, i) => (
                            <li key={i}>• {note}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* IMPACT */}
            {data.impact && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Impact</h2>
                    <ul className="space-y-2 text-muted-foreground">
                        {data.impact.map((point, i) => (
                            <li key={i}>• {point}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* CTA */}
            <div className="text-center pt-10">
                <Link
                    href="/case-studies"
                    className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-80"
                >
                    View More Case Studies
                </Link>
            </div>
        </section>
    );
}
