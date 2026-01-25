import { GlassCard } from '../../components/v2/GlassCard';
import { TextReveal } from '../../components/v2/TextReveal';
import { V2Layout } from '../../components/v2/V2Layout';

export default function ContentPage() {
    return (
        <V2Layout>
            <div className="min-h-screen p-8 pt-24 px-4 md:px-12 flex flex-col gap-12">
                <header className="max-w-4xl mx-auto w-full text-center">
                    <TextReveal
                        text="Content & Media"
                        className="text-4xl md:text-6xl font-bold text-v2-accent justify-center mb-4"
                    />
                    <p className="text-v2-foreground/60 text-lg">
                        Technical writing and videos.
                    </p>
                </header>

                <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
                    <GlassCard className="p-8" hoverEffect>
                        <h2 className="text-2xl font-bold mb-4 text-v2-primary">YouTube</h2>
                        <div className="flex flex-col gap-4">
                            {[1, 2].map(i => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="w-32 h-20 bg-black/50 rounded flex items-center justify-center text-xs text-white/50">Thumbnail</div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-v2-foreground">Building a SaaS in 2024</h3>
                                        <p className="text-sm text-v2-foreground/50">12K views &bull; 2 weeks ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard className="p-8" hoverEffect>
                        <h2 className="text-2xl font-bold mb-4 text-v2-secondary">Articles</h2>
                        <ul className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <li key={i} className="group cursor-pointer">
                                    <a href="#" className="flex justify-between items-center py-2 border-b border-white/10 group-hover:border-v2-secondary transition-colors">
                                        <span className="text-lg text-v2-foreground group-hover:text-v2-secondary transition-colors">Advanced React Patterns</span>
                                        <span className="text-sm text-v2-foreground/50">Read &rarr;</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </GlassCard>
                </div>
            </div>
        </V2Layout>
    );
}
