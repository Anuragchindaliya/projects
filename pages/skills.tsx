import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const library = [
    { title: "ReactJS", level: "Expert" },
    { title: "NextJS", level: "Expert" },
    { title: "ReactNative", level: "Advanced" },
    { title: "Redux", level: "Expert" },
    { title: "Jest", level: "Intermediate" },
    { title: "Google Map", level: "Advanced" },
    { title: "React Chartjs", level: "Intermediate" },
    { title: "Tailwind", level: "Expert" },
    { title: "Material UI", level: "Advanced" },
    { title: "Three.js", level: "Intermediate" },
];

const language = [
    { title: "HTML5", level: "Expert" },
    { title: "CSS3", level: "Expert" },
    { title: "JavaScript", level: "Expert" },
    { title: "TypeScript", level: "Advanced" },
    { title: "NodeJS", level: "Advanced" },
    { title: "SQL", level: "Intermediate" },
    { title: "C++", level: "Basics" },
];

const tools = [
    { title: "VSCode", level: "Expert" },
    { title: "Git/Github", level: "Expert" },
    { title: "Postman", level: "Advanced" },
    { title: "Jira", level: "Intermediate" },
    { title: "Figma", level: "Intermediate" },
    { title: "Docker", level: "Basics" },
];

const SkillColumn = ({
    items,
    title,
    className,
    speed = 15
}: {
    items: typeof language,
    title: string,
    className?: string,
    speed?: number
}) => {
    return (
        <div className={cn("flex flex-col", className)}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-500 dark:from-neutral-200 dark:to-neutral-500  mb-4"
            >
                {title}
            </motion.h2>
            <div className="flex flex-row gap-4 relative">
                {/* Kinetic Drifting Effect */}
                <motion.div
                    animate={{ y: [-5, 5, -5] }} // Reduced drift range for minimalist feel
                    transition={{
                        duration: speed,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="flex flex-row flex-wrap gap-4"
                >
                    {items.map((skill, idx) => (
                        <GlassCard key={idx} className="">
                            <div className="flex flex-row justify-between items-center h-full gap-4">
                                <h3 className="font-bold text-neutral-700 dark:text-neutral-200">{skill.title}</h3>
                                {/* <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">{skill.level}</p> */}
                                <div className="h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700 overflow-hidden">
                                    <div className={cn("h-full bg-neutral-500 dark:bg-neutral-400",
                                        skill.level === "Expert" ? "w-full" :
                                            skill.level === "Advanced" ? "w-3/4" :
                                                skill.level === "Intermediate" ? "w-1/2" : "w-1/4"
                                    )} />
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

const Skills = () => {
    return (
        <AuroraBackground className="overflow-auto scrollbar-hide">
            <section className="relative z-10 w-full min-h-screen py-20 px-4 md:px-10 flex flex-col items-center">
                {/* <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div> */}

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-black via-black/80 to-black/20 dark:from-white dark:via-white/80 dark:to-white/20 pb-4">
                        Technical Skills
                    </h1>
                    <p className="text-neutral-400 max-w-lg mx-auto text-lg">
                        A curated collection of technologies and tools I use to build digital experiences.
                    </p>
                </motion.div>

                <div className=" gap-6 w-full max-w-6xl">
                    <SkillColumn title="Languages" items={language} speed={8} className="md:mt-0" />
                    <SkillColumn title="Frameworks" items={library} speed={12} className="md:mt-8" />
                    <SkillColumn title="Tools" items={tools} speed={10} className="md:mt-8" />
                </div>
            </section>
        </AuroraBackground>
    );
};

export default Skills;
