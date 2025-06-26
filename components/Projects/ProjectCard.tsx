import { motion } from "framer-motion";
import { Eye, History } from "lucide-react";
import { PostI } from "../../types";
import { LinkPreview } from "../ui/link-preview";
import Paragraph from "../ui/text-animation";
const ProjectCard = ({ post, index }: { post: PostI; index: number }) => {
    const { frontmatter } = post;
    console.log({ frontmatter, index })
    return (
        <motion.article
            className="p-8 bg-white rounded-xl shadow group dark:bg-gray-800"
            key={post.slug}
            // initial="offscreen"
            whileInView={{
                opacity: 1,
                y: 0,
                // x: 0,
                // transition: { staggerChildren: 0.05, staggerDirection: -1 },
            }}
            viewport={{
                once: true,
                amount: 0,
            }}
            initial={{
                y: 50,
                // x: "-100%",
                opacity: 0,
            }}
            transition={{
                // type: "spring",
                // bounce: 0.2,
                duration: 0.4,
                delay: index * 0.1,
                // staggerChildren: 0.05,
                // staggerDirection: -1,
            }}
            animate={{}}
        // variants={cardVariants}
        >
            {/* <Link href={"./works/" + post.slug}> */}
            <div className="">
                {/* <motion.div
                        //   className="transition-all aspect-square"
                        className="relative overflow-hidden transition bg-gray-100 rounded-md hover:scale-105 dark:bg-gray-800"
                        layoutId={post.slug + "hero_img"}
                        initial={false}
                        animate={false}
                    >
                        <img
                            src={post.frontmatter.cover_image}
                            className="object-cover h-full"
                            alt="post_thumbnail"
                        />
                    </motion.div> */}
                {/* <div>
                        <span className="inline-block mt-5 text-xs font-medium tracking-wider uppercase text-emerald-700">
                            Personal Growth
                        </span>
                    </div> */}
                <motion.h2
                    layoutId={post.slug + "heading"}
                    className="mt-2 text-2xl md:text-7xl font-semibold tracking-normal text-brand-primary dark:text-white"
                >
                    <span className=" bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-blue-800 dark:to-blue-900">
                        {frontmatter.title}
                    </span>
                </motion.h2>
                <div className="mt-2 text-sm md:text-4xl text-gray-500 dark:text-gray-400">
                    <Paragraph paragraph={frontmatter.excerpt} />


                </div>
                {frontmatter?.technology?.length > 0 && <div>
                    <h3 className="mt-4 mb-2 text-base md:text-4xl font-semibold dark:text-gray-300">Technology</h3>
                    <ul className="flex flex-wrap text-xs sm:text-">
                        {frontmatter?.technology?.map((tech) => {
                            console.log({ tech })
                            return <li key={tech.link} className="text-gray-800 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full  sm:px-5 p-1 px-2 sm:py-2.5  mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-700/90 dark:focus:ring-gray-700 dark:border-gray-700 capitalize md:text-xl">
                                <LinkPreview url={tech.link} className="font-bold">
                                    {tech.title}
                                </LinkPreview>
                            </li>
                        })}
                    </ul>
                </div>}
                <div className="mt-3">
                    <div className="flex justify-between my-2">
                        <h3 className="text-base font-semibold dark:text-gray-300 md:text-4xl">Roles</h3>

                    </div>
                    <ul className="text-sm md:text-3xl space-y-3 leading-relaxed prose text-gray-500 md:list-disc md:ml-5 dark:text-gray-400">
                        {frontmatter?.roles?.map((tech) => {
                            return <li key={tech} ><Paragraph paragraph={tech} /></li>
                        })}
                    </ul>

                </div>

                <div className="flex flex-wrap items-center justify-center my-2 space-x-6">
                    <a href={frontmatter.appurl} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-sm sm:text-3xl text-gray-500 dark:text-gray-400 " >
                        <Eye className="" />
                        <u>
                            URL
                        </u>
                    </a>
                    <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                        {/* <div className="flex items-center gap-3">
                            <div className="relative flex-shrink-0 w-5 h-5">
                                <img
                                    alt="Erika Oliver"
                                    src="https://cdn.sanity.io/images/cijrdavx/production/4e20f048a69ac41ab7a6b5f1687f0547379b7469-3648x5472.jpg?w=3840&q=75&fit=clip&auto=format"
                                    decoding="async"
                                    className="object-cover w-full h-full rounded-full"
                                    sizes="30px"
                                />
                            </div>
                            <span className="text-sm">Erika Oliver</span>
                        </div> */}
                        {/* <span className="text-xs text-gray-300 dark:text-gray-600">•</span> */}
                        <History className="w-4" />
                        <time className="text-sm sm:text-3xl"
                            dateTime={frontmatter.timeline}>
                            {frontmatter.timeline}
                        </time>
                        {/* <span>Read more</span> */}
                    </div>
                </div>

            </div>
            {/* </Link> */}
        </motion.article>
    );
};
const TechStack = () => {

}

export default ProjectCard