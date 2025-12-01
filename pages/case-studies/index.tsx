"use client";

import data from "@/components/CaseStudyLayout/data";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CaseStudyListPage() {
    return (
        <section className="max-w-4xl mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-10 text-center">Case Studies</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.map((study, index) => (
                    <motion.div
                        key={study.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-xl p-6 shadow-sm bg-card hover:shadow-lg transition-all"
                    >
                        <h2 className="text-xl font-semibold">{study.title}</h2>
                        <p className="text-muted-foreground mt-2 line-clamp-3">
                            {study.description}
                        </p>

                        <Link
                            href={`/case-studies/${study.slug}`}
                            className="text-blue-600 font-medium mt-4 block hover:underline"
                        >
                            Read Case Study →
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
