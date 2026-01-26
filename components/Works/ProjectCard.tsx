import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { PostI } from "../../types";
const ProjectCard = ({ post, index }: { post: PostI; index: number }) => {
    const { frontmatter } = post;
    return (

        <motion.article
            className="relative p-6 rounded-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-500 glass-etch backdrop-blur-4xl    bg-accent group-hover:bg-white/5 group-hover:border-white/20"
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
            {/* Glassmorphism Background - Handled by container class now */}
            {/* <div className="absolute inset-0 glass-etch transition-colors duration-500 group-hover:bg-primary/10 z-0" /> */}

            {/* Animated Gradient Border/Glow on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                    background: 'radial-gradient(800px circle at var(--mouse-x, center) var(--mouse-y, center), rgba(255,255,255,0.06), transparent 40%)'
                }}
            />

            {/* Gradient Blob for "Smooth Gradient Animation" */}
            <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-primary/10 to-transparent z-0 opacity-0 group-hover:opacity-100 animate-shimmer pointer-events-none mix-blend-overlay" />

            <div className="relative z-10">
                <motion.h2
                    layoutId={post.slug + "heading"}
                    className="mt-2 text-2xl font-bold tracking-tight text-foreground relative"
                >
                    <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent bg-[length:0%_100%] bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_100%]">
                        {frontmatter.title}
                    </span>
                    <span className="absolute inset-0 text-foreground group-hover:text-transparent transition-colors duration-500" aria-hidden="true">
                        {frontmatter.title}
                    </span>
                </motion.h2>

                <div className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    <p>{frontmatter.excerpt}</p>
                </div>

                {frontmatter?.technology?.length > 0 && (
                    <div className="mt-6">
                        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Technology</h3>
                        <div className="flex flex-wrap gap-2">
                            {frontmatter?.technology?.map((tech) => (
                                <span
                                    key={tech.link}
                                    className="px-3 py-1 text-xs font-medium text-foreground bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm"
                                >
                                    {tech.title}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-6">
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Key Roles</h3>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                        {frontmatter?.roles?.map((role, i) => (
                            <li key={i} className="flex items-start">
                                <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                                {role}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between mt-8 pt-4 border-t border-border">
                    <a
                        href={frontmatter.appurl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        <span>View Live</span>
                    </a>

                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
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