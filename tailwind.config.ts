// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // App Router + classic pages (both with and without /src)
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",

    // If you keep MD/MDX content outside app/components
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [],
};

export default config;