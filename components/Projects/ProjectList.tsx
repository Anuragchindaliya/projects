import { motion } from "framer-motion";
import { PostI } from "types";

import { Timeline } from "@/components/ui/timeline";
import { Eye, History } from "lucide-react";
import { LinkPreview } from "../ui/link-preview";
import Paragraph from "../ui/text-animation";
type ProjectType = {
    id: number;
    title: string;
    date: string;
    timeline: string;
    excerpt: string;
    cover_image: string;
    technology: {
        title: string;
        link: string;
    }[];
    roles: string[];
    appurl: string;
    year: string;
}
const Project = ({ projectData }: { projectData: ProjectType }) => {
    return <div className="group/project">
        <div className="relative z-10 inline-block">
            <LinkPreview url={projectData.appurl} >
                <motion.h2
                    className="my-2 text-3xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 dark:from-cyan-300 via-blue-300 to-purple-600 dark:to-purple-300"
                >
                    {projectData.title}
                </motion.h2>
            </LinkPreview>
        </div>
        <div className="mt-4 text-sm md:text-lg text-neutral-900 leading-relaxed -z-20 max-w-2xl">
            <Paragraph paragraph={projectData.excerpt} className="text-xl pt-0 sm:text-4xl pl-0 text-black dark:text-neutral-300" />
        </div>

        {projectData.technology?.length > 0 && <div>
            <h3 className="mt-6 mb-3 text-sm font-semibold text-cyan-500 uppercase tracking-widest">Technology</h3>
            <ul className="flex flex-wrap gap-2 text-sm">
                {projectData.technology?.map((tech) => {
                    return <LinkPreview key={tech.link} url={tech.link} className="">
                        <li className="px-4 py-1.5 rounded-md bg-white/5 border border-cyan-600/10 dark:border-white/10 text-cyan-600/90 dark:text-cyan-200/90 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-500/50 dark:hover:text-cyan-100 transition-all duration-300 font-medium whitespace-nowrap">
                            {tech.title}
                        </li>
                    </LinkPreview>
                })}
            </ul>
        </div>}

        <div className="mt-6">
            <div className="flex justify-between my-2">
                <h3 className="text-sm font-semibold text-purple-500 uppercase tracking-widest">Roles</h3>
            </div>
            <ul className="space-y-2 relative ">
                {projectData.roles?.map((role, idx) => {
                    return <li key={idx} className="flex items-center  text-neutral-400 group/role">
                        <span className="mt-2 w-2.5 h-1.5 rounded-full bg-purple-500/50 group-hover/role:bg-purple-400 group-hover/role:shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-all" />
                        {/* <span className="text-lg text-neutral-300">{role}</span> */}
                        <Paragraph paragraph={role} className="text-xl sm:text-5xl text-black dark:text-white " />
                    </li>
                })}
            </ul>
        </div>

        <div className="flex flex-wrap items-center mt-8 gap-6 border-t border-white/5 pt-6">
            <a href={projectData.appurl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-neutral-400 hover:text-cyan-300 transition-colors group/link" >
                <Eye className="w-5 h-5 group-hover/link:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] transition-all" />
                <span className="text-lg font-medium">Live Preview</span>
            </a>
            <div className="flex items-center gap-2 text-neutral-500">
                <History className="w-4 h-4" />
                <time className="text-sm font-mono tracking-wider"
                    dateTime={projectData.timeline}>
                    {projectData.timeline}
                </time>
            </div>
        </div>
    </div>
}


const ProjectList = ({ posts }: { posts: PostI[] }) => {
    const data = posts.map((post) => ({
        title: post.frontmatter.year,
        content: <Project projectData={post.frontmatter} />
    }))
    return (
        <section className="bg-neutral-950 w-full">
            <div className="w-full">
                <Timeline data={data} />
            </div>
        </section>
    )
}

export default ProjectList