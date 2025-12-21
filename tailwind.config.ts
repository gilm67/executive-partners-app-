// tailwind.config.ts (Tailwind v3)
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0B0E13", // main background
          surface: "#111827", // card / panel background (slate-900 style)
          gold: "#D4AF37", // main gold accent (buttons, key highlights)
          goldSoft: "#F5D778", // softer gold for labels / small accents
          text: "#F9FAFB", // primary text on dark background
          textMuted: "#9CA3AF", // secondary / muted text
        },
      },

      // ✅ Auto-scrolling testimonials (infinite horizontal scroll)
      keyframes: {
        scrollX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "scroll-x": "scrollX 45s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;