import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          200: "#F7E8B0",
          300: "#F0E0B0",
          400: "#E2C878",
          500: "#C9A84C",
          600: "#A68B3A",
          700: "#86702E",
          900: "#3D2E10",
        },
        electric: {
          400: "#9ECBFF",
          500: "#5BA3E6",
          600: "#3A7CC0",
        },
        ivory: "#F5F0E8",
        obsidian: "#050507",
        "slate-dark": "#0A0C10",
        "slate-mid": "#12151C",
        "slate-border": "#1E2230",
        "slate-border-bright": "#2A3040",
        "live-red": "#E53E3E",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        heading: ["'Bebas Neue'", "Impact", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        flicker: "flicker 3s linear infinite",
      },
      keyframes: {
        "pulse-gold": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.4" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
