/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#FDFAF5",
          100: "#FAF5EC",
          200: "#F5EDD8",
          300: "#EDE0C4",
        },
        espresso: {
          DEFAULT: "#2C1810",
          light: "#4A2C1A",
          muted: "#6B4226",
        },
        blush: {
          DEFAULT: "#E8C4C0",
          light: "#F0D8D5",
          muted: "#D4A09A",
        },
        champagne: {
          DEFAULT: "#C9A96E",
          light: "#D4B882",
          dark: "#A8864A",
        },
        seal: "#8B6B47",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        body: ["Lora", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "gentle-pulse": "gentlePulse 3s ease-in-out infinite",
        "wax-spin": "waxSpin 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gentlePulse: {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
        waxSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      boxShadow: {
        luxury: "0 4px 40px rgba(44, 24, 16, 0.12), 0 1px 8px rgba(44, 24, 16, 0.06)",
        "luxury-lg": "0 8px 60px rgba(44, 24, 16, 0.15), 0 2px 16px rgba(44, 24, 16, 0.08)",
        card: "0 2px 20px rgba(44, 24, 16, 0.08)",
        "card-hover": "0 8px 40px rgba(44, 24, 16, 0.14)",
      },
    },
  },
  plugins: [],
};
