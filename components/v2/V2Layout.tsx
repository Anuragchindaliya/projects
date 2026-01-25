import React from 'react';
import AudioSettingsDialog from './AudioSettingsDialog';
import { V2AudioProvider } from './V2AudioProvider';
import { V2Footer } from './V2Footer';
import { V2Navbar } from './V2Navbar';
import { V2ThemeProvider, useV2Theme } from './V2ThemeProvider';
import { useCinematicAudio } from './useCinematicAudio';

interface V2LayoutProps {
    children: React.ReactNode;
}

const V2LayoutInner = ({ children }: V2LayoutProps) => {
    const { mode } = useV2Theme();
    // We can pass `true` to enable, or control via some user preference
    const { startHum, playHover, playClick } = useCinematicAudio(true);
    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

    return (
        <div
            className={`min-h-screen w-full relative overflow-hidden transition-colors duration-700 font-sans
        ${mode === 'dark' ? 'bg-v2-background text-v2-foreground' : 'bg-v2-background text-v2-foreground'}
      `}
            onClick={startHum} // specific interaction to start audio context
            onMouseEnter={startHum}
        >
            <V2Navbar />

            {/* Content Container */}
            <main className="relative z-10 w-full h-screen pt-20 overflow-y-auto no-scrollbar scroll-smooth">
                {children}
                <V2Footer />
            </main>

            {/* Optional: Global Overlay for grain or texture */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-noise" />

            <AudioSettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </div>
    );
};

export const V2Layout = ({ children }: V2LayoutProps) => {
    return (
        <V2ThemeProvider>
            <V2AudioProvider>
                <V2LayoutInner>{children}</V2LayoutInner>
            </V2AudioProvider>
        </V2ThemeProvider>
    );
};
