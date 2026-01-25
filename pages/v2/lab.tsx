import { GlassCard } from '../../components/v2/GlassCard';
import { TextReveal } from '../../components/v2/TextReveal';
import { V2Layout } from '../../components/v2/V2Layout';

export default function LabPage() {
    return (
        <V2Layout>
            <div className="min-h-screen p-8 pt-24 px-4 md:px-12 flex flex-col gap-12">
                <header className="max-w-4xl mx-auto w-full text-center">
                    <TextReveal
                        text="The Lab"
                        className="text-4xl md:text-6xl font-bold text-v2-secondary justify-center mb-4"
                    />
                    <p className="text-v2-foreground/60 text-lg">
                        Interactive experiments and micro-apps.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
                    {['Gravity Sim', 'Three.js Playground', 'AI Chatbot', 'Audio Viz', 'Data Dash', 'Shader Art'].map((item, i) => (
                        <GlassCard key={i} className="aspect-square flex items-center justify-center p-6 text-center" hoverEffect>
                            <h4 className="text-xl font-semibold text-v2-accent">{item}</h4>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </V2Layout>
    );
}
