import { Badge } from '../../components/ui/badge';
import { BentoGrid, BentoGridItem } from '../../components/ui/bento-grid';
import { TextReveal } from '../../components/v2/TextReveal';
import { V2Layout } from '../../components/v2/V2Layout';

const PROJECTS = [
    {
        title: 'CDOT – Gati Shakti',
        description: 'Streamlined telecom infrastructure approvals via a single-window, GIS-based system. Spearheaded dynamic form rendering for major states of India with Form.io.',
        header: <div className="flex h-full w-full min-h-[6rem] rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-white/10" />,
        className: "md:col-span-2",
        icon: <Badge variant="secondary">Govt Telecom</Badge>,
        tech: ['React', 'AntD', 'OpenForge', 'Vite']
    },
    {
        title: 'Cytrellis Ellacor',
        description: 'Platform for skin treatment management. Integrated Google Maps, Charts, and Shopify API. Implemented OTP-based auth.',
        header: <div className="flex h-full w-full min-h-[6rem] rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/10" />,
        className: "md:col-span-1",
        icon: <Badge variant="secondary">Healthcare</Badge>,
        tech: ['React', 'TS', 'Redux', 'Tailwind']
    },
    {
        title: 'NielsenIQ Analytics',
        description: 'Business intelligence platform. Migrated modules from EXTJS to ReactJS. Managed 6 language localizations and server-side grids.',
        header: <div className="flex h-full w-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10" />,
        className: "md:col-span-1",
        icon: <Badge variant="secondary">Analytics</Badge>,
        tech: ['React', 'Redux-thunk', 'KendoReact']
    },
    {
        title: 'CureBay',
        description: 'Hybrid healthcare model. Implemented on-scroll loading data using Intersection observer and visual graphs.',
        header: <div className="flex h-full w-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-white/10" />,
        className: "md:col-span-2",
        icon: <Badge variant="secondary">Healthcare</Badge>,
        tech: ['React', 'Redux-saga', 'Charts']
    },
];

export default function WorkPage() {
    return (
        <V2Layout>
            <div className="min-h-screen p-8 pt-24 px-4 md:px-12 max-w-7xl mx-auto">
                <header className="text-center mb-12">
                    <TextReveal
                        text="Featured Projects"
                        className="text-4xl md:text-6xl font-bold text-white justify-center mb-4"
                    />
                </header>

                <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[25rem]">
                    {PROJECTS.map((item, i) => (
                        <BentoGridItem
                            key={i}
                            title={<span className="text-xl text-white block mt-2">{item.title}</span>}
                            description={
                                <div className="flex flex-col gap-4">
                                    <span className="text-v2-foreground/70 leading-relaxed block">{item.description}</span>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {item.tech.map(t => (
                                            <Badge key={t} variant="glass" className="text-[10px] px-2 py-0">{t}</Badge>
                                        ))}
                                    </div>
                                </div>
                            }
                            header={item.header}
                            className={item.className + " p-6 flex flex-col"}
                            icon={item.icon}
                        />
                    ))}
                </BentoGrid>
            </div>
        </V2Layout>
    );
}
