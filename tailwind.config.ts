import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: "#E5FF1F",
        "sky-light": "#DBEFFB",
        "sky-hero": "#A9D6F6",
        ink: "#101010",
        cream: "#EFF0E8",
        "card-pink": "#E79AA6",
        "card-lavender": "#C5BAEE",
        "shadow-blue": "#3355FF",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        serif: ["var(--font-playfair)", "serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        rotateRing: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        glitch: {
          "0%": { clipPath: "inset(0 0 95% 0)" },
          "10%": { clipPath: "inset(0 0 85% 0)" },
          "20%": { clipPath: "inset(0 0 70% 0)" },
          "30%": { clipPath: "inset(0 0 50% 0)" },
          "40%": { clipPath: "inset(0 0 30% 0)" },
          "50%": { clipPath: "inset(0 0 10% 0)" },
          "100%": { clipPath: "inset(0 0 0% 0)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        blink: "blink 1s step-end infinite",
        float: "float 4s ease-in-out infinite",
        rotateRing: "rotateRing 60s linear infinite",
        rotateRingReverse: "rotateRing 80s linear infinite reverse",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        glitch: "glitch 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
