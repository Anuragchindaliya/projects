import { motion } from "framer-motion";
import { Eye, History } from "lucide-react";
import { PostI } from "../../types";
const ProjectCard = ({ post, index }: { post: PostI; index: number }) => {
    const { frontmatter } = post;
    return (

        <motion.article
            className="relative p-6 rounded-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-500 dark:bg-gray-800 shadow"
            key={post.slug}
            // initial="offscreen"
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0,
            }}
            initial={{
                y: 50,
                opacity: 0,
            }}
            transition={{
                duration: 0.4,
                delay: index * 0.1,
            }}
        >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-white/10 dark:border-white/5 transition-colors duration-500 group-hover:bg-white/10 dark:group-hover:bg-black/10 z-0" />

            {/* Animated Gradient Border/Glow on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                    background: 'radial-gradient(800px circle at var(--mouse-x, center) var(--mouse-y, center), rgba(255,255,255,0.06), transparent 40%)'
                }}
            />

            {/* Gradient Blob for "Smooth Gradient Animation" */}
            <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent z-0 opacity-0 group-hover:opacity-100 animate-shimmer pointer-events-none mix-blend-overlay" />

            <div className="relative z-10">
                <motion.h2
                    layoutId={post.slug + "heading"}
                    className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                    <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent bg-[length:0%_100%] bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_100%]">
                        {frontmatter.title}
                    </span>
                    <span className="absolute inset-0 text-gray-900 dark:text-white group-hover:text-transparent transition-colors duration-500" aria-hidden="true">
                        {frontmatter.title}
                    </span>
                </motion.h2>

                <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p>{frontmatter.excerpt}</p>
                </div>

                {frontmatter?.technology?.length > 0 && (
                    <div className="mt-6">
                        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Technology</h3>
                        <div className="flex flex-wrap gap-2">
                            {frontmatter?.technology?.map((tech) => (
                                <span
                                    key={tech.link}
                                    className="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-100/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full backdrop-blur-sm"
                                >
                                    {tech.title}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-6">
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Key Roles</h3>
                    <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                        {frontmatter?.roles?.map((role, i) => (
                            <li key={i} className="flex items-start">
                                <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-gray-500 rounded-full shrink-0" />
                                {role}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between mt-8 pt-4 border-t border-gray-200/50 dark:border-white/10">
                    <a
                        href={frontmatter.appurl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        <span>View Live</span>
                    </a>

                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                        <History className="w-4 h-4" />
                        <time dateTime={frontmatter.timeline}>{frontmatter.timeline}</time>
                    </div>
                </div>
            </div>
        </motion.article>
    );

};
const TechStack = () => {

}

export default ProjectCard