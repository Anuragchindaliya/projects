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
    return <div>
        <div className="relative z-10 inline-block">
            <LinkPreview url={projectData.appurl} >
                <motion.h2
                    // layoutId={post.slug + "heading"}
                    className="my-2 text-3xl md:text-7xl font-semibold tracking-normal text-brand-primary dark:text-white"
                >
                    <span className=" bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-blue-800 dark:to-blue-900">
                        {projectData.title}
                    </span>
                </motion.h2>
            </LinkPreview>
        </div>
        <div className="mt-2 text-sm md:text-4xl text-gray-500 dark:text-gray-400 -z-20">
            <Paragraph paragraph={projectData.excerpt} className="text-xl pt-0 sm:text-5xl pl-0  text-black dark:text-white" />

        </div>
        {projectData.technology?.length > 0 && <div>
            <h3 className="mt-4 mb-2 text-base md:text-4xl font-semibold dark:text-gray-300">Technology</h3>
            <ul className="flex flex-wrap text-xs">
                {projectData.technology?.map((tech) => {
                    return <LinkPreview key={tech.link} url={tech.link} className="font-bold text-gray-800 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full  sm:px-5 p-1 px-2 sm:py-2.5  mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-700/90 dark:focus:ring-gray-700 dark:border-gray-700 capitalize md:text-xl">
                        <li>
                            {tech.title}
                        </li>
                    </LinkPreview>
                })}
            </ul>
        </div>}

        <div className="mt-3">
            <div className="flex justify-between my-2">
                <h3 className="text-base font-semibold dark:text-gray-300 md:text-4xl">Roles</h3>

            </div>
            <ul className="text-sm md:text-3xl space-y-3 leading-relaxed prose text-gray-500 md:list-disc md:ml-5 dark:text-gray-400 marker:text-black dark:marker:text-white  list-disc ">
                {projectData.roles?.map((tech) => {
                    return <li key={tech} ><Paragraph paragraph={tech} className="text-xl sm:text-5xl text-black dark:text-white" /></li>
                })}
            </ul>

        </div>
        <div className="flex flex-wrap items-center justify-center my-2 space-x-6">
            <a href={projectData.appurl} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-sm sm:text-3xl text-gray-500 dark:text-gray-400 " >
                <Eye className="" />
                <u>
                    URL
                </u>
            </a>
            <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                <History className="w-4" />
                <time className="text-sm sm:text-3xl"
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
        <section className=" dark:bg-gray-900 dark:bg-gradient-to-t dark:from-gray-900 dark:to-gray-900  bg-gradient-to-b from-white t">

            <div className="w-full">
                <Timeline data={data} />
            </div>
            {/* <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
                <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
                    <h2 className="lg:text-9xl mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Projects
                    </h2>
                    <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl md:text-3xl">
                        Bringing ideas to life
                    </p>
                </div>

                <div className="mt-10 grid gap-10 md:grid-cols-1 lg:gap-10 ">
                    <NoSsr>
                        {posts.map((post, i) => (
                            <ProjectCard post={post} index={i} key={post.slug} />
                        ))}
                    </NoSsr>
                </div>
            </div> */}
        </section>
    )
}

export default ProjectList