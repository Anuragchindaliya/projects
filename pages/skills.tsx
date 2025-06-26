import { AuroraBackground } from "@/components/ui/aurora-background";

const library = [
    {
        title: "ReactJS",
    },
    {
        title: "NextJS",
    },
    {
        title: "ReactNative",
    },
    {
        title: "Redux (saga,thunk,toolkit)",
    },
    {
        title: "Jest"
    },
    {
        title: "Google Map",
    },
    {
        title: "React big Calendar",
    },
    {
        title: "React Chartjs",
    },
    {
        title: "Tailwind",
    },
    {
        title: "Tailwind plugin preset",
    },
    {
        title: "Bootstrap",
    },
    {
        title: "Ant Design",
    },
    {
        title: "Material UI",
    },
];
const language = [
    {
        title: "HTML5",
    },
    {
        title: "CSS3",
    },
    {
        title: "JavaScript + NodeJS",
    },
    {
        title: "Typescript",
    },
    {
        title: "SQL",
    },
    {
        title: "C, C++",
    },
    {
        title: "JAVA",
    },
]
const developmentTools = [
    {
        title: "VSCode",
    },
    {
        title: "Postman",
    },
    {
        title: "GIT + Github",
    },
    {
        title: "Bitbucket",
    },
    {
        title: "Jira",
    },
    {
        title: "ReactDevTool",
    },
    {
        title: "Husky",
    },
]
const database = [
    {
        title: "MySQL"
    },
    {
        title: "MongoDB"
    },
]
const skillArr = [
    {
        title: "Language",
        data: language,
    },
    {
        title: "Framework/Library",
        data: library,
    },
    {
        title: "Development Tools",
        data: developmentTools
    },
    {
        title: "Database",
        data: database
    }
]
const Skills = () => {
    return (
        <AuroraBackground>
            <section className=" dark:bg-gray-900">
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:px-6">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Skills</h1>
                    <div className="flex flex-col gap-4">
                        {skillArr.map((subSkill) => {
                            return <div key={subSkill.title}>
                                <h2 className="my-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white ">{subSkill.title}</h2>
                                <ol
                                    className="relative flex flex-wrap gap-4 dark:text-gray-300 "
                                // border-l border-gray-200 dark:border-gray-700
                                >
                                    {subSkill.data.map((exp, i, exps) => (
                                        <li key={i} className="relative px-2 py-1 text-xs bg-gray-100 rounded sm:text-base sm:px-4 sm:py-2 dark:bg-gray-800 animate-shimmerOne bg-[length:300%_100%] bg-[linear-gradient(110deg,transparent,45%,grey,55%,transparent)]">
                                            {/* // <li key={i} className="relative text-xs bg-gray-100 dark:bg-gray-800 inline-flex h-12 animate-shimmerOne items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:300%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"> */}
                                            {exp.title}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        })}
                        {/* <div>
                        <h2 className="my-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white ">Language</h2>
                        <ol
                            className="relative flex flex-wrap gap-4 dark:text-gray-300 "
                        // border-l border-gray-200 dark:border-gray-700
                        >
                            {language.map((exp, i, exps) => (
                                <li key={i} className="relative px-2 py-1 text-xs bg-gray-100 rounded sm:text-base sm:px-4 sm:py-2 dark:bg-gray-800">
                                    {exp.title}
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <h2 className="my-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white ">Framework/Library</h2>
                        <ol
                            className="relative flex flex-wrap gap-4 dark:text-gray-300 "
                        // border-l border-gray-200 dark:border-gray-700
                        >
                            {library.map((exp, i, exps) => (
                                <li key={i} className="relative px-2 py-1 text-xs bg-gray-100 rounded sm:text-base sm:px-4 sm:py-2 dark:bg-gray-800">
                                    {exp.title}
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <h2 className="my-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white ">Development Tools</h2>
                        <ol
                            className="relative flex flex-wrap gap-4 dark:text-gray-300 "
                        // border-l border-gray-200 dark:border-gray-700
                        >
                            {developmentTools.map((exp, i, exps) => (
                                <li key={i} className="relative px-2 py-1 text-xs bg-gray-100 rounded sm:text-base sm:px-4 sm:py-2 dark:bg-gray-800">
                                    {exp.title}
                                </li>
                            ))}
                        </ol>
                    </div> */}
                    </div>
                </div>
            </section>
        </AuroraBackground>
    );
};

export default Skills;
