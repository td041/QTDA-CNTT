import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2fbf7",
          100: "#d7f4e6",
          200: "#b0e8cf",
          300: "#7fd7b4",
          400: "#4fc397",
          500: "#28a97f",
          600: "#198a66",
          700: "#136e53",
          800: "#125743",
          900: "#0f4737"
        }
      }
    },
  },
  plugins: [],
} satisfies Config;