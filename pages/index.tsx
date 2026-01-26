import { Spotlight } from "@/components/ui/Spotlight";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import path from "path";
import Project from "../components/Works/Project";
import { PostI } from "../types";
import { sortByDate } from "../utils";
import Profile from "./profile";
import Skills from "./skills";

import { V2AudioProvider } from "../components/v2/V2AudioProvider";

const AnimatedFloor = () => {
  return (
    <div className=" h-screen w-full flex justify-center items-center top-0 absolute"
      style={{
        perspective: 100
      }}
    >
      <motion.div
        className="absolute bottom-0 w-full h-[50%] bg-grid bg-repeat bg-opacity-70"
        style={{

          // perspective: 1000,
          transform: "rotateX(60deg)",
          backgroundSize: "100px 100px",
          backgroundColor: "#ffffff",
          backgroundImage:
            "linear-gradient(to right, #f472b6 1px, transparent 1px), linear-gradient(to bottom, #f472b6 1px, transparent 1px)", // Pink borders
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
};

// export default AnimatedFloor;
const HomeContent = ({ posts }: { posts: PostI[] }) => {
  // const { playClick } = useCinematicAudio(true);

  return (
    <>
      <Head>
        <title>Anurag chindaliya portfolio</title>
        <meta name="description" content="Software engineer from faridabad india" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative ">
        <BackgroundBeams className="z-0" />

        {/* <CapsuleSlider /> */}
        {/* <div className="absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900 "></div> */}
        <div className="relative z-10">
          <div className="dark:bg-gray-900">
            <Spotlight className="-top-96 -left-56 md:left-96 md:-top-96 " fill="white" />
          </div>
          <div className="overflow-hidden  ">
            <Profile />
            {/* <AnimatedFloor /> */}
          </div>
          {/* <Hero /> */}
          {/* <Testimonial /> */}
          {/* <Posts posts={posts} /> */}
          <div className="relative w-full max-w-lg bg-red-700 ">
            <div className="absolute top-0 h-10 w-20 animate-blob rounded-full bg-purple-300/50 opacity-70 mix-blend-multiply blur-xl filter dark:bg-purple-900 dark:mix-blend-screen md:h-60 md:w-60"></div>
            <div className="animation-delay-2000 absolute left-1/2 top-0 h-10 w-20 animate-blob rounded-full bg-yellow-300/50 opacity-70 mix-blend-multiply blur-xl filter dark:bg-yellow-900 dark:mix-blend-screen md:h-60 md:w-60"></div>
            <div className="animation-delay-4000 absolute -bottom-8 left-1/2 h-10 w-20 animate-blob rounded-full bg-pink-300/50 opacity-70 mix-blend-multiply blur-xl filter dark:bg-pink-900 dark:mix-blend-screen md:h-60 md:w-60"></div>
          </div>

          <Project posts={posts} />
          {/* <AuroraBackground> */}
          <Skills />
          {/* </AuroraBackground> */}

        </div>
      </main>

      <LampContainer>

        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl text-gray-900"
        >
          Thankyou for <br />
          visiting
        </motion.h1>

      </LampContainer>
    </>
  );
};

const Home = ({ posts }: { posts: PostI[] }) => {
  return (
    <V2AudioProvider>
      <HomeContent posts={posts} />
    </V2AudioProvider>
  )
}
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

export default Home;
