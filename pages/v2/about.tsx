import { Badge } from '../../components/ui/badge';
import { TracingBeam } from '../../components/ui/tracing-beam';
import { GlassCard } from '../../components/v2/GlassCard';
import { TextReveal } from '../../components/v2/TextReveal';
import { useCinematicAudio } from '../../components/v2/useCinematicAudio';
import { V2Layout } from '../../components/v2/V2Layout';

const SKILLS = {
    "Language": ["HTML5", "CSS3/Sass", "JavaScript", "NodeJS", "TypeScript", "SQL", "C/C++", "Java"],
    "Libraries/Frameworks": ["React", "React Native", "Redux (saga, thunk, toolkit, query)", "Jest", "Tailwind", "Bootstrap", "MaterialUI", "Kendo-React UI", "react-hook-form", "Zod", "Ant design", "Radix UI", "Formio", "Tanstack Query"],
    "Developer Tools": ["VS Code", "Postman", "Git", "Docker", "Jira", "ReactDevTool", "Husky", "openForge", "BitBucket"]
};

// Experience Data from Resume
const EXPERIENCE = [
    {
        title: "Software Engineer",
        company: "Amantya Technologies, Gurgaon",
        period: "May 2022 – Present",
        description: "Translated Figma Design to fully responsive, rich accessible, reusable components. Led a team of front-end developers, ensuring timely project delivery. Implemented Jest for writing test cases and generated test coverage reports.",
        badge: "Current"
    },
    {
        title: "Web Developer",
        company: "Web2Rise, Faridabad",
        period: "Jan 2021 – May 2022",
        description: "Developed web solutions using ReactJS with efficient state management (Context API and Redux). Implemented backend in NodeJS and PHP using MySQL and MongoDB."
    },
    {
        title: "Web Developer (Intern)",
        company: "Abacus Desk IT, Faridabad",
        period: "2020", // Inferred
        description: "Created responsive and interactive pages from PSD to code using CSS frameworks (Bootstrap) and jQuery. Customize and extend design and features using PHP, HTML, CSS, JavaScript and MySql database."
    }
];

function AboutPageChild() {
    const { playHover, playWhoosh } = useCinematicAudio();

    return (
        <V2Layout>
            <div className="min-h-screen pt-24 pb-12 px-4 md:px-12">
                {/* Skills Section */}
                <div className="max-w-6xl mx-auto mb-20">
                    <header className="text-center mb-12">
                        <TextReveal
                            text="Technical Arsenal"
                            className="text-4xl md:text-5xl font-bold text-white justify-center mb-4"
                        />
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(SKILLS).map(([category, items]) => (
                            <GlassCard key={category} className="p-6" hoverEffect onMouseEnter={() => { playHover(); playWhoosh(); }}>
                                <h3 className="text-xl font-bold text-v2-secondary mb-4 border-b border-white/10 pb-2">{category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {items.map(skill => (
                                        <Badge key={skill} variant="glass">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* Experience Section with Tracing Beam */}
                <TracingBeam className="px-6">
                    <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center md:text-left">Professional Journey</h2>

                        {EXPERIENCE.map((item, index) => (
                            <div key={index} className="mb-12 relative pl-8 border-l border-white/10 md:border-none md:pl-0">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-v2-primary">{item.title}</h3>
                                    <span className="text-sm text-v2-foreground/50 font-mono">{item.period}</span>
                                </div>

                                <div className="text-lg font-semibold text-white mb-2">{item.company}</div>

                                <div className="text-sm text-v2-foreground/80 leading-relaxed bg-white/5 p-4 rounded-lg border border-white/10 backdrop-blur-sm">
                                    {item.description}
                                </div>
                            </div>
                        ))}

                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-white mb-2">Education</h3>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <div className="text-v2-primary font-bold">Maharishi Dayanand University</div>
                                <div className="text-v2-foreground/80 text-sm">Bachelor of Computer Application (2016 – 2019)</div>
                                <div className="text-v2-foreground/80 text-sm">Master of Science in Computer (2019 – 2021)</div>
                            </div>
                        </div>
                    </div>
                </TracingBeam>
            </div>
        </V2Layout>
    );
}
export default function AboutPage() {
    return (
        <V2Layout>
            <AboutPageChild />
        </V2Layout>
    );
}


