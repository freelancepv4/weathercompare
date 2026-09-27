import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1180px",
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#b7d9ff",
          300: "#86bfff",
          400: "#4f9bff",
          500: "#2478ff",
          600: "#0f5cf0",
          700: "#0c48c4",
          800: "#0f3c9c",
          900: "#12357c",
          950: "#0b1f49",
        },
        sky: {
          glow: "#7dd3fc",
        },
        surface: {
          light: "#ffffff",
          subtle: "#f6f8fc",
          dark: "#0b1220",
          "dark-subtle": "#0f1830",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(15, 23, 42, 0.10)",
        "soft-lg": "0 4px 12px rgba(15, 23, 42, 0.06), 0 24px 48px -16px rgba(15, 23, 42, 0.16)",
        "glow-brand": "0 0 0 1px rgba(36,120,255,0.15), 0 8px 30px -6px rgba(36,120,255,0.35)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(130% 120% at 50% -20%, #38bdf8 0%, #0284c7 30%, #1d4ed8 65%, #1e3a8a 100%)",
        "mesh-light":
          "radial-gradient(60% 50% at 10% 0%, rgba(36,120,255,0.10) 0%, rgba(36,120,255,0) 60%), radial-gradient(50% 40% at 90% 10%, rgba(125,211,252,0.18) 0%, rgba(125,211,252,0) 60%)",
      },
      keyframes: {
        "drift-slow": {
          "0%": { transform: "translateX(-5%)" },
          "100%": { transform: "translateX(5%)" },
        },
        "drift-slower": {
          "0%": { transform: "translateX(4%)" },
          "100%": { transform: "translateX(-4%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        "drift-slow": "drift-slow 40s ease-in-out infinite alternate",
        "drift-slower": "drift-slower 60s ease-in-out infinite alternate",
        "fade-up": "fade-up 0.5s ease-out both",
        shimmer: "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
