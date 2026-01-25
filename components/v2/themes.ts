export const themes = {
    cosmic: {
        name: 'Cosmic',
        colors: {
            primary: '#8b5cf6', // Violet 500
            secondary: '#ec4899', // Pink 500
            accent: '#6366f1', // Indigo 500
            background: '#030014', // Deep Space
            foreground: '#f8fafc', // Slate 50
        },
    },
    aurora: {
        name: 'Aurora',
        colors: {
            primary: '#10b981', // Emerald 500
            secondary: '#06b6d4', // Cyan 500
            accent: '#3b82f6', // Blue 500
            background: '#022c22', // Deep Teal
            foreground: '#f0fdf4', // Green 50
        },
    },
    supernova: {
        name: 'Supernova',
        colors: {
            primary: '#f97316', // Orange 500
            secondary: '#ef4444', // Red 500
            accent: '#eab308', // Yellow 500
            background: '#451a03', // Deep Orangeish Brown
            foreground: '#fff7ed', // Orange 50
        },
    },
    nebula: {
        name: 'Nebula',
        colors: {
            primary: '#d946ef', // Fuchsia 500
            secondary: '#8b5cf6', // Violet 500
            accent: '#0ea5e9', // Sky 500
            background: '#2e1065', // Deep Violet
            foreground: '#fdf4ff', // Fuchsia 50
        },
    },
};

export type ThemeKey = keyof typeof themes;
