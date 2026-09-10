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
        navy: {
          50: "#f4f6f8",
          100: "#e5e9ee",
          200: "#cbd3dd",
          300: "#a3b2c3",
          400: "#748aa3",
          500: "#4f6884",
          600: "#384d67",
          700: "#26364b",
          800: "#172333",
          900: "#0d1522",
          950: "#070c14",
        },
        gold: {
          50: "#faf7f2",
          100: "#f3ede1",
          200: "#e5d9c2",
          300: "#d4c2a1",
          400: "#c0a87e",
          500: "#a88e62",
          600: "#8e754d",
          700: "#725c3b",
          800: "#554329",
          900: "#392c1a",
          950: "#241a0e",
        },
        ebony: {
          800: "#12151b",
          900: "#0b0e14",
          950: "#06080c",
        },
        creme: {
          50: "#fbfbfa",
          100: "#f7f6f2",
          200: "#eeece5",
          300: "#dfdbce",
        },
        brand: {
          whatsapp: "#1D7F54",
          "whatsapp-dark": "#166B44",
        },
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(10, 15, 25, 0.04)",
        subtle: "0 1px 3px 0 rgba(10, 15, 25, 0.04), 0 1px 2px -1px rgba(10, 15, 25, 0.03)",
        luxury: "0 10px 30px -5px rgba(10, 15, 25, 0.06), 0 4px 10px -3px rgba(10, 15, 25, 0.03)",
        "luxury-hover": "0 20px 40px -10px rgba(10, 15, 25, 0.12), 0 8px 16px -4px rgba(10, 15, 25, 0.05)",
      },
      scale: {
        102: "1.02",
        103: "1.03",
      },
      transitionDuration: {
        400: "400ms",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "Didot", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

