"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

type ThemeColor = "zinc" | "slate" | "stone" | "gray" | "neutral" | "red" | "rose" | "orange" | "green" | "blue" | "yellow" | "violet";

interface ThemeColorState {
    themeColor: ThemeColor;
    setThemeColor: (color: ThemeColor) => void;
}

const ThemeColorContext = React.createContext<ThemeColorState | undefined>(undefined);

export function useThemeColor() {
    const context = React.useContext(ThemeColorContext);
    if (!context) {
        throw new Error("useThemeColor must be used within a ThemeColorProvider");
    }
    return context;
}

interface ThemeColorProviderProps {
    children: React.ReactNode;
}

export function ThemeColorProvider({ children }: ThemeColorProviderProps) {
    const [themeColor, setThemeColor] = React.useState<ThemeColor>("neutral");
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        try {
            const savedColor = localStorage.getItem("theme-color") as ThemeColor;
            if (savedColor) {
                setThemeColor(savedColor);
            }
        } catch (e) {
            console.warn("Failed to read theme-color from localStorage", e);
        }
    }, []);

    React.useEffect(() => {
        if (mounted) {
            try {
                localStorage.setItem("theme-color", themeColor);
                document.body.setAttribute("data-theme-color", themeColor);
            } catch (e) {
                console.warn("Failed to save theme-color to localStorage", e);
            }
        }
    }, [themeColor, mounted]);

    return (

        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <ThemeColorContext.Provider value={{ themeColor, setThemeColor }}>
                {children}
            </ThemeColorContext.Provider>
        </NextThemesProvider>
    );

}
