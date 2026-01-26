"use client";

import { Monitor, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { useThemeColor } from "./theme-color-provider";

export function ThemeSwitcher() {
    const { setTheme, theme } = useTheme();
    const { setThemeColor, themeColor } = useThemeColor();

    const colors = [
        { name: "Neutral", value: "neutral", class: "bg-neutral-500" },
        { name: "Zinc", value: "zinc", class: "bg-zinc-500" },
        { name: "Slate", value: "slate", class: "bg-slate-500" },
        { name: "Blue", value: "blue", class: "bg-blue-500" },
        { name: "Violet", value: "violet", class: "bg-violet-500" },
        { name: "Gray", value: "gray", class: "bg-gray-500" },
        { name: "Green", value: "green", class: "bg-green-500" },
        { name: "Orange", value: "orange", class: "bg-orange-500" },
    ];

    return (
        <div className="fixed bottom-5 right-5 z-[9999]">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="w-10 h-10 rounded-full glass-etch">
                        <Palette className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Palette className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 glass-etch">
                    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                        <Sun className="mr-2 h-4 w-4" /> Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                        <Moon className="mr-2 h-4 w-4" /> Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                        <Monitor className="mr-2 h-4 w-4" /> System
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuLabel>Accent Color</DropdownMenuLabel>
                    <div className="grid grid-cols-4 gap-1 p-1">
                        {colors.map((color) => (
                            <button
                                key={color.value}
                                onClick={() => setThemeColor(color.value as any)}
                                className={`
                        w-6 h-6 rounded-full border flex items-center justify-center transition-all
                        ${color.class} 
                        ${themeColor === color.value ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-black ring-neutral-900 dark:ring-white scale-110' : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'}
                    `}
                                title={color.name}
                            />
                        ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
