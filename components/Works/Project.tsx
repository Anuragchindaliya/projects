import { PostI } from "../../types";
import NoSsr from "../common/NoSsr";
import ProjectCard from "./ProjectCard";

const Project = ({ posts }: { posts: PostI[] }) => {
  return (
    <section className=" dark:bg-gray-900 dark:bg-gradient-to-t dark:from-gray-900 dark:to-gray-900  bg-gradient-to-b from-white t">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          <h2 className="lg:text-5xxl mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Projects
          </h2>
          <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            Bringing ideas to life
            {/* We use an agile approach to test assumptions and connect with the
              needs of your audience early and often. */}
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 ">
          <NoSsr>
            {posts.map((post, i) => (
              <ProjectCard post={post} index={i} key={post.slug} />
            ))}
          </NoSsr>
        </div>
      </div>
    </section>
  );
};

export default Project;
