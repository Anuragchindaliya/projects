import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeKey, themes } from './themes';

type Mode = 'light' | 'dark';

interface V2ThemeContextType {
    mode: Mode;
    theme: ThemeKey;
    setMode: (mode: Mode) => void;
    setTheme: (theme: ThemeKey) => void;
    toggleMode: () => void;
}

const V2ThemeContext = createContext<V2ThemeContextType | undefined>(undefined);

export function V2ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<Mode>('dark');
    const [theme, setTheme] = useState<ThemeKey>('cosmic');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Determine initial state from localStorage or system preference
        const storedMode = localStorage.getItem('v2-mode') as Mode;
        const storedTheme = localStorage.getItem('v2-theme') as ThemeKey;

        if (storedMode) setMode(storedMode);
        if (storedTheme && themes[storedTheme]) setTheme(storedTheme);

        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        localStorage.setItem('v2-mode', mode);
        localStorage.setItem('v2-theme', theme);

        // Apply CSS variables to :root (or specific container)
        const root = document.documentElement;
        const selectedTheme = themes[theme].colors;

        // Apply Mode (standard Tailwind dark mode class)
        if (mode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Apply Theme Colors
        Object.entries(selectedTheme).forEach(([key, value]) => {
            // V2 prefix to avoid collisions if needed, or mapping to existing variables
            root.style.setProperty(`--v2-${key}`, value);

            // Optional: Map to generic variables if specific V2 utilities aren't used everywhere
            // root.style.setProperty(`--${key}`, value); 
        });

    }, [mode, theme, mounted]);

    const toggleMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <V2ThemeContext.Provider value={{ mode, theme, setMode, setTheme, toggleMode }}>
            {children}
        </V2ThemeContext.Provider>
    );
}

export function useV2Theme() {
    const context = useContext(V2ThemeContext);
    if (context === undefined) {
        throw new Error('useV2Theme must be used within a V2ThemeProvider');
    }
    return context;
}
