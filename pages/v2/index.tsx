import Link from 'next/link';
import { GlassCard } from '../../components/v2/GlassCard';
import { TextReveal } from '../../components/v2/TextReveal';
import { V2Layout } from '../../components/v2/V2Layout';
import { useV2Theme } from '../../components/v2/V2ThemeProvider';
import { useCinematicAudio } from '../../components/v2/useCinematicAudio';

const NAV_ITEMS = [
    { label: 'Work', href: '/v2/work', desc: 'Case Studies', color: 'text-v2-primary' },
    { label: 'Lab', href: '/v2/lab', desc: 'Experiments', color: 'text-v2-secondary' },
    { label: 'Content', href: '/v2/content', desc: 'Media', color: 'text-v2-accent' },
    { label: 'About', href: '/v2/about', desc: 'Experience', color: 'text-white' },
];

const V2HomeContent = () => {
    const { toggleMode, setTheme, theme, mode } = useV2Theme();
    const { playHover, playClick } = useCinematicAudio();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
            {/* Main Hero Content */}
            <div className="text-center z-20 mb-16 max-w-4xl px-4">
                <TextReveal
                    text="Hi, I'm"
                    className="text-2xl md:text-3xl text-v2-foreground/60 font-medium mb-2 justify-center"
                    duration={0.5}
                />
                <TextReveal
                    text="Anurag Chindaliya"
                    className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 justify-center"
                    duration={0.8}
                    delay={0.2}
                />
                <TextReveal
                    text="A software engineer with 5 years experience specializing in Frontend technologies and intermediate in backend."
                    className="text-lg md:text-xl text-v2-foreground/80 max-w-2xl mx-auto leading-relaxed justify-center"
                    delay={0.5}
                />

                <div className="flex justify-center gap-4 mt-8">
                    {['@anurag-chindaliya', '@Anuragchindaliya', 'anuragwebpoint'].map((handle, i) => (
                        <GlassCard key={i} className="px-4 py-2 text-sm text-v2-primary hover:text-white cursor-pointer" hoverEffect onClick={playClick} onMouseEnter={playHover}>
                            {handle}
                        </GlassCard>
                    ))}
                </div>
            </div>

            {/* Quick Links (Replacing Nav Cards with just CTA) */}
            <div className="flex justify-center gap-6 z-20">
                <Link href="/v2/work">
                    <GlassCard className="px-8 py-4 text-xl font-bold bg-v2-primary/20 hover:bg-v2-primary/40 border-v2-primary/50" hoverEffect onClick={playClick} onMouseEnter={playHover}>
                        View Projects
                    </GlassCard>
                </Link>
                <Link href="/v2/contact">
                    <GlassCard className="px-8 py-4 text-xl font-bold hover:bg-white/10" hoverEffect onClick={playClick} onMouseEnter={playHover}>
                        Contact Me
                    </GlassCard>
                </Link>
            </div>

            {/* Contact Terminal Link */}
            <div className="absolute bottom-8 right-8 z-30">
                <Link href="/v2/contact">
                    <GlassCard className="px-6 py-3 flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors" hoverEffect onClick={playClick}>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-mono text-sm text-v2-foreground">Terminal Active</span>
                    </GlassCard>
                </Link>
            </div>

            {/* Theme Controls (Subtle) */}
            <div className="absolute bottom-8 left-8 z-30 flex gap-2">
                <button onClick={() => { playClick(); toggleMode(); }} className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-white/50">
                    {mode === 'dark' ? 'go light' : 'go dark'}
                </button>
                <button onClick={() => { playClick(); setTheme('cosmic'); }} className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/50" title="Cosmic" />
                <button onClick={() => { playClick(); setTheme('aurora'); }} className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50" title="Aurora" />
            </div>
        </div>
    );
};

export default function V2Home() {
    return (
        <V2Layout>
            <V2HomeContent />
        </V2Layout>
    );
}
