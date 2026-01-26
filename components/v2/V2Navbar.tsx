import Link from 'next/link';
import { GlassCard } from './GlassCard';
import { useV2Theme } from './V2ThemeProvider';
import { useCinematicAudio } from './useCinematicAudio';

const NAV_LINKS = [
    { label: 'Home', href: '/v2' },
    { label: 'Projects', href: '/v2/work' },
    { label: 'Skills', href: '/v2/about' }, // Mapping 'Skills' to About page
    { label: 'Profile', href: '/v2/about' }, // Mapping 'Profile' to About page
    { label: 'Case Studies', href: '/v2/work' }, // Mapping 'Case Studies' to Work page
];

export const V2Navbar = () => {
    const { toggleMode, mode } = useV2Theme();
    const { playClick, playHover } = useCinematicAudio();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
            <GlassCard className="pointer-events-auto flex items-center gap-8 px-8 py-3 rounded-full bg-black/20 border-white/10 backdrop-blur-xl shadow-2xl">
                {/* Logo */}
                <div className='flex'>
                    <Link href="/v2" className="flex items-center gap-2 group" onClick={playClick} onMouseEnter={playHover}>
                        {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-v2-primary to-v2-secondary flex items-center justify-center font-bold text-white text-lg">
                        A
                    </div> */}
                        <span className="font-bold text-white tracking-tight hidden md:block group-hover:text-v2-primary transition-colors mr-4">
                            Anurag
                        </span>
                    </Link>

                    {/* Links */}
                    <ul className="hidden md:flex items-center gap-6">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-white/70 hover:text-white hover:scale-105 transition-all"
                                    onClick={playClick}
                                    onMouseEnter={playHover}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Toggle */}
                    <div className="flex items-center gap-4 border-l border-white/10 pl-4 ml-4">
                        <button
                            onClick={() => { playClick(); toggleMode(); }}
                            onMouseEnter={playHover}
                            className="text-white/70 hover:text-white transition-colors"
                            title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}
                        >
                            {mode === 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2" /><path d="M12 21v2" /><path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" /><path d="M1 12h2" /><path d="M21 12h2" /><path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </GlassCard>
        </nav>
    );
};
