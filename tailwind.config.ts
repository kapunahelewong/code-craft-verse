import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        editor: {
          bg: "#1E1E1E",
          sidebar: "#252526",
          active: "#37373D",
          hover: "#2A2D2E",
          text: "#D4D4D4",
          border: "#404040",
          number: "#858585",
        },
      },
      fontFamily: {
        mono: ["Monaco", "Consolas", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
