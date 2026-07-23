import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Base surfaces — near-black navy, not pure black
        base: {
          void: "#05070C",      // page background
          deep: "#0A0D14",      // sidebar / recessed panels
          surface: "#0D1017",   // card background
          raised: "#12151E",    // hovered / raised card
          border: "#1C2030",    // hairline borders
          borderLight: "#252A3D",
        },
        // Accent system
        accent: {
          blue: "#3B6FF6",
          blueLight: "#6690FF",
          cyan: "#22D3EE",
          purple: "#8B5CF6",
          purpleDeep: "#6D28D9",
        },
        // Semantic
        signal: {
          up: "#22C55E",
          down: "#F0435C",
          warn: "#F5A623",
          gold: "#F0B429",
        },
        ink: {
          primary: "#F3F5F9",
          secondary: "#9AA1B2",
          tertiary: "#5C6478",
          disabled: "#3A3F52",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grad-primary": "linear-gradient(135deg, #3B6FF6 0%, #8B5CF6 100%)",
        "grad-radial-glow":
          "radial-gradient(circle at center, rgba(59,111,246,0.18) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)",
        "grad-surface": "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(59,111,246,0.25)",
        glowCyan: "0 0 30px rgba(34,211,238,0.2)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px rgba(0,0,0,0.4)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-slow": "pulse-slow 3.5s ease-in-out infinite",
        "spin-slow": "spin-slow 60s linear infinite",
        "rise-in": "rise-in 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
