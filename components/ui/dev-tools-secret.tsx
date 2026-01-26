"use client";

import { useEffect } from "react";
import { useThemeColor } from "./theme-color-provider";

const colorMap: Record<string, string> = {
    neutral: "#525252",
    zinc: "#52525b",
    slate: "#475569",
    blue: "#2563eb",
    violet: "#7c3aed",
    green: "#16a34a",
    orange: "#ea580c",
    gray: "#4b5563",
};

export const DevToolsSecret = () => {
    const { themeColor } = useThemeColor();

    useEffect(() => {
        // Wait a bit for everything to load so it's the last thing in console
        const timer = setTimeout(() => {
            const color = colorMap[themeColor] || "#2563eb";

            // console.clear();
            console.log(
                `%c  HIRE ME!  \n%cLooking under the hood? I like your curiosity.\nLet's build something premium together.`,
                `color: white; background: ${color}; font-size: 24px; font-weight: bold; padding: 10px; border-radius: 5px;`,
                `color: ${color}; font-size: 14px; margin-top: 10px; font-style: italic;`
            );
            console.log(
                `%cContact: %canuragwebpoint@gmail.com`,
                `font-weight: bold; color: #888;`,
                `color: ${color}; font-weight: bold;`
            );
        }, 1000);

        return () => clearTimeout(timer);
    }, [themeColor]);

    return null;
};
