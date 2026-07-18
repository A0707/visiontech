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
      padding: "1.5rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        night: {
          DEFAULT: "#0F172A",
          950: "#080D19",
          900: "#0F172A",
          800: "#141E33",
          700: "#1B2740",
        },
        electric: {
          DEFAULT: "#2563EB",
          50: "#EFF4FF",
          400: "#4B83F5",
          500: "#2563EB",
          600: "#1D4ED8",
        },
        cyan: {
          DEFAULT: "#06B6D4",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
        },
        slate: {
          DEFAULT: "#64748B",
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 50% 0%, rgba(37,99,235,0.18), transparent 60%)",
        "cyan-glow":
          "radial-gradient(circle at 80% 20%, rgba(6,182,212,0.15), transparent 55%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
      boxShadow: {
        glow: "0 0 40px rgba(37, 99, 235, 0.25)",
        "glow-cyan": "0 0 40px rgba(6, 182, 212, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
