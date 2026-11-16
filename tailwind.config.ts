import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-sand": "var(--bg-sand)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        indigo: "var(--indigo)",
        "indigo-soft": "var(--indigo-soft)",
        marigold: "var(--marigold)",
        madder: "var(--madder)",
        lotus: "var(--lotus)",
        sage: "var(--sage)",
        border: "var(--border)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Fraunces", "Noto Serif Devanagari", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "Noto Sans Devanagari", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
