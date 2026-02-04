/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";
// const svgToDataUri = require("mini-svg-data-uri");
import svgToDataUri from "mini-svg-data-uri";

export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",
];
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      neutral: colors.neutral,
      "v2-primary": "var(--v2-primary)",
      "v2-secondary": "var(--v2-secondary)",
      "v2-accent": "var(--v2-accent)",
      "v2-background": "var(--v2-background)",
      "v2-foreground": "var(--v2-foreground)",
      "v2-dark": "var(--v2-background)", // Alias for backward compat
      "v2-light": "var(--v2-foreground)", // Alias for backward compat
      "v2-glass-border": "rgba(255, 255, 255, 0.1)",
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      pulseFloor: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-5px)' },
      },
      "accordion-down": {
        from: { height: 0 },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: 0 },
      },
      blob: {
        "0%": {
          transform: "translate(0px, 0px) scale(1)",
        },
        "33%": {
          transform: "translate(30px, -50px) scale(1.1)",
        },
        "66%": {
          transform: "translate(-20px, 20px) scale(0.9)",
        },
        "100%": {
          transform: "tranlate(0px, 0px) scale(1)",
        },
      },
      aurora: {
        from: {
          backgroundPosition: "50% 50%, 50% 50%",
        },
        to: {
          backgroundPosition: "350% 50%, 350% 50%",
        },
      },
      spotlight: {
        "0%": {
          opacity: 0,
          transform: "translate(-72%, -62%) scale(0.5)",
        },
        "100%": {
          opacity: 1,
          transform: "translate(-50%,-40%) scale(1)",
        },
      },
      shimmer: {
        from: {
          backgroundPosition: "0 0",
        },
        to: {
          backgroundPosition: "-200% 0",
        },
      },
      '50%': {
        'background-size': '200% 200%',
        'background-position': 'right center'
      },
      "cell-ripple": {
        "0%": {
          opacity: 0.4,
          transform: "scale(1)",
        },
        "50%": {
          opacity: 1,
          transform: "scale(1.25)",
        },
        "100%": {
          opacity: 0.4,
          transform: "scale(1)",
        },
      },
    },
    "v2-float": {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-20px)" },
    },
    "v2-pulse-glow": {
      "0%, 100%": { opacity: 1 },
      "50%": { opacity: 0.5 },
    },
  },
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    blob: "blob 7s infinite",
    aurora: "aurora 60s linear infinite",
    spotlight: "spotlight 2s ease .75s 1 forwards",
    shimmer: "shimmer 2s linear infinite",
    shimmerOne: "shimmer 2s linear",
    "floatFloor": 'pulseFloor 5s ease-in-out infinite',
    "text": 'text 5s ease infinite',
    "v2-float": "v2-float 6s ease-in-out infinite",
    "v2-pulse-glow": "v2-pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    "cell-ripple": "cell-ripple var(--duration, 2000ms) ease-out forwards",
  },
};
export const plugins = [require("tailwindcss-animate"), addVariablesForColors, gridBg, addBgDotThick];

/**
 * @param {import('tailwindcss/types/config').PluginAPI} options
 */
function gridBg({ matchUtilities, theme }) {
  matchUtilities(
    {
      "bg-grid": (/** @type {string} */ value) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-grid-small": (/** @type {string} */ value) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-dot": (/** @type {string} */ value) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
        )}")`,
      }),
    },
    { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
  );
}

/**
 * @param {import('tailwindcss/types/config').PluginAPI} options
 */
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
/**
 * @param {import('tailwindcss/types/config').PluginAPI} options
 */
function addBgDotThick({ matchUtilities, theme }) {
  matchUtilities(
    {
      "bg-dot-thick": (/** @type {string} */ value) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
        )}")`,
      }),
    },
    { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
  );
}
