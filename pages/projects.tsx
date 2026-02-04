import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import path from "path";
// import Project from "../components/Works/Project";
import ProjectList from "@/components/Projects/ProjectList";
import { PostI } from "../types";
import { sortByDate } from "../utils";


const Projects = ({ posts }: { posts: PostI[] }) => {
    return (
        <>
            <Head>
                <title>Anurag chindaliya portfolio</title>
                <meta name="description" content="Software engineer from faridabad" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <BackgroundCellAnimation /> */}
            {/* <div className="relative bg-neutral-950 flex justify-center overflow-hidden">
                <BackgroundCellCore />
                <div className="relative z-50 mt-40 pointer-events-none select-none">
                    <h1 className="md:text-2xl lg:text-7xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400 pointer-events-none">
                        Background cell animation <br />
                        with framer motion
                    </h1>
                </div>
            </div> */}
            <main className="relative pointer-events-none">
                {/* <CapsuleSlider /> */}


                <div className="absolute top-0 left-0 z-0 w-full h-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 "></div>
                <div className="relative ">
                    {/* <Hero /> */}
                    {/* <Testimonial /> */}
                    {/* <Posts posts={posts} /> */}
                    {/* <Project posts={posts} /> */}
                    <ProjectList posts={posts} />
                </div>
            </main>
        </>
    );
};
export async function getStaticProps() {
    // Get files from the posts dir
    const files = fs.readdirSync(path.join("db", "projects"));

    // Get slug and frontmatter from posts
    const posts = files.map((filename) => {
        // Create slug
        const slug = filename.replace(".md", "");

        // Get frontmatter
        const markdownWithMeta = fs.readFileSync(
            path.join("db", "projects", filename),
            "utf-8"
        );

        const { data: frontmatter } = matter(markdownWithMeta);

        return {
            slug,
            frontmatter,
        };
    });
    return {
        props: {
            posts: posts.sort(sortByDate),
        },
    };
}

export default Projects;
