import React, { createContext, useContext, useEffect, useState } from 'react';

interface V2AudioContextType {
    isBgMuted: boolean;
    isSfxMuted: boolean;
    toggleBgMute: () => void;
    toggleSfxMute: () => void;
    volume: number;
    setVolume: (val: number) => void;
}

const V2AudioContext = createContext<V2AudioContextType | undefined>(undefined);

export function V2AudioProvider({ children }: { children: React.ReactNode }) {
    const [isBgMuted, setIsBgMuted] = useState(false);
    const [isSfxMuted, setIsSfxMuted] = useState(false);
    const [volume, setVolume] = useState(0.5); // Global master volume if needed
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        try {
            const storedBg = localStorage.getItem('v2-audio-bg-muted');
            const storedSfx = localStorage.getItem('v2-audio-sfx-muted');

            if (storedBg !== null) setIsBgMuted(storedBg === 'true');
            if (storedSfx !== null) setIsSfxMuted(storedSfx === 'true');
        } catch (e) {
            console.warn("Failed to access localStorage for V2AudioProvider", e);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        try {
            localStorage.setItem('v2-audio-bg-muted', String(isBgMuted));
            localStorage.setItem('v2-audio-sfx-muted', String(isSfxMuted));
        } catch (e) {
            console.warn("Failed to save to localStorage in V2AudioProvider", e);
        }
    }, [isBgMuted, isSfxMuted, mounted]);

    const toggleBgMute = () => setIsBgMuted(prev => !prev);
    const toggleSfxMute = () => setIsSfxMuted(prev => !prev);

    return (
        <V2AudioContext.Provider value={{ isBgMuted, isSfxMuted, toggleBgMute, toggleSfxMute, volume, setVolume }}>
            {children}
        </V2AudioContext.Provider>
    );
}

export function useV2Audio() {
    const context = useContext(V2AudioContext);
    if (context === undefined) {
        throw new Error('useV2Audio must be used within a V2AudioProvider');
    }
    return context;
}
