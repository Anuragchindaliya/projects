const plugin = require("tailwindcss/plugin");

exports.themePlugin = plugin(
  ({ addBase, addUtilities }:{ addBase:any, addUtilities:any }) => {
  const root = {
    "--background": "0 0% 100%",
    "--foreground": "222.2 47.4% 11.2%",
    "--muted": "210 40% 96.1%",
    "--muted-foreground": "215.4 16.3% 46.9%",
    "--popover": "0 0% 100%",
    "--popover-foreground": "222.2 47.4% 11.2%",
    "--card": "0 0% 100%",
    "--card-foreground": "222.2 47.4% 11.2%",
    "--border": "214.3 31.8% 91.4%",
    "--input": "214.3 31.8% 91.4%",
    "--primary": "240deg 3.23% 12.16%",
    "--primary-foreground": "0deg 100% 98.04%",
    "--secondary": "210 40% 96.1%",
    "--secondary-foreground": "222.2 47.4% 11.2%",
    "--accent": "210 40% 96.1%",
    "--accent-foreground": "222.2 47.4% 11.2%",
    "--destructive": "0 100% 50%",
    "--destructive-foreground": "210 40% 98%",
    "--ring": "215 20.2% 65.1%",
    "--radius": "0.5rem",
  };
  const dark = {
    "--background": "224 71% 4%",
    "--foreground": "213 31% 91%",
    "--muted": "223 47% 11%",
    "--muted-foreground": "215.4 16.3% 56.9%",
    "--popover": "224 71% 4%",
    "--popover-foreground": "215 20.2% 65.1%",
    "--card": "224 71% 4%",
    "--card-foreground": "213 31% 91%",
    "--border": "216 34% 17%",
    "--input": "216 34% 17%",
    "--primary": "210 40% 98%",
    "--primary-foreground": "222.2 47.4% 1.2%",
    "--secondary": "222.2 47.4% 11.2%",
    "--secondary-foreground": "210 40% 98%",
    "--accent": "216 34% 17%",
    "--accent-foreground": "210 40% 98%",
    "--destructive": "0 63% 31%",
    "--destructive-foreground": "210 40% 98%",
    "--ring": "216 34% 17%",
    "--radius": "0.5rem",
  };
  const baseTheme = {
    ":root": root,
    ".dark": dark,
  };
  const playground = {
    '[data-section="playground"]': {
      "--background": "0 0% 100%",
      "--foreground": "222.2 47.4% 11.2%",
      "--muted": "154 79% 96%",
      "--muted-foreground": "215.4 16.3% 46.9%",
      "--popover": "0 0% 100%",
      "--popover-foreground": "222.2 47.4% 11.2%",
      "--border": "214.3 31.8% 91.4%",
      "--input": "214.3 31.8% 91.4%",
      "--card": "0 0% 100%",
      "--card-foreground": "222.2 47.4% 11.2%",
      "--primary": "143 72% 29%",
      "--primary-foreground": "141 75% 97%",
      "--secondary": "145 80% 10%",
      "--secondary-foreground": "141 75% 97%",
      "--accent": "154 79% 96%",
      "--accent-foreground": "222.2 47.4% 11.2%",
      "--destructive": "0 100% 50%",
      "--destructive-foreground": "210 40% 98%",
      "--ring": "158 64% 52%",
      "--radius": "0rem",
    },
    '.dark [data-section="playground"]': {
      "--background": "224 71% 4%",
      "--foreground": "213 31% 91%",
      "--muted": "223 47% 11%",
      "--muted-foreground": "215.4 16.3% 56.9%",
      "--popover": "224 71% 4%",
      "--popover-foreground": "215 20.2% 65.1%",
      "--border": "216 34% 17%",
      "--input": "216 34% 17%",
      "--card": "224 71% 4%",
      "--card-foreground": "213 31% 91%",
      "--primary": "143 72% 29%",
      "--primary-foreground": "141 75% 97%",
      "--secondary": "145 80% 10%",
      "--secondary-foreground": "141 75% 97%",
      "--accent": "154 79% 96%",
      "--accent-foreground": "222.2 47.4% 11.2%",
      "--destructive": "0 100% 50%",
      "--destructive-foreground": "210 40% 98%",
      "--ring": "158 64% 52%",
      "--radius": "0rem",
    },
  };
  // addBase(playground)

  const music = {
    '[data-section="music"]': {
      "--background": "0 0% 100%",
      "--foreground": "222.2 47.4% 11.2%",
      "--muted": "243 5% 96%",
      "--muted-foreground": "215.4 16.3% 46.9%",
      "--popover": "0 0% 100%",
      "--popover-foreground": "222.2 47.4% 11.2%",
      "--border": "214.3 31.8% 91.4%",
      "--input": "214.3 31.8% 91.4%",
      "--card": "0 0% 100%",
      "--card-foreground": "222.2 47.4% 11.2%",
      "--primary": "349 89% 60%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "243 11% 4%",
      "--secondary-foreground": "0 0% 98%",
      "--accent": "243 11% 4%",
      "--accent-foreground": "0 0% 100%",
      "--destructive": "0 100% 50%",
      "--destructive-foreground": "210 40% 98%",
      "--ring": "349 89% 60%",
      "--radius": "0.5rem",
    },
    '.dark[data-section="music"]': {
      "--background": "224 71% 4%",
      "--foreground": "213 31% 91%",
      "--muted": "223 47% 11%",
      "--muted-foreground": "215.4 16.3% 56.9%",
      "--accent": "216 34% 17%",
      "--accent-foreground": "210 40% 98%",
      "--popover": "224 71% 4%",
      "--popover-foreground": "215 20.2% 65.1%",
      "--border": "216 34% 17%",
      "--input": "216 34% 17%",
      "--card": "224 71% 4%",
      "--card-foreground": "213 31% 91%",
      "--primary": "349 89% 60%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "222.2 47.4% 11.2%",
      "--secondary-foreground": "210 40% 98%",
      "--destructive": "0 63% 31%",
      "--destructive-foreground": "210 40% 98%",
      "--ring": "216 34% 17%",
      "--radius": "0.5rem",
    },
  };

  // addBase(music)
  const others = {
    "*": {
      fontFamily: "sans-serif",
      "@apply border-border": {},
    },
    body: {
      "@apply bg-background text-foreground": {},
      fontFeatureSettings: '"rlig" 1, "calt" 1',
    },
  };
  addBase({ ...baseTheme, ...playground, ...music, ...others });
  addUtilities({
    ".app-h-screen": {
      height: ["100vh", "100dvh"],
    },
  });
});