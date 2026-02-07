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
        // Warm, artisanal palette
        crust: {
          50: "#faf8f5",
          100: "#f5f0e8",
          200: "#ebe0cf",
          300: "#dcc9ad",
          400: "#c9a97f",
          500: "#b98f5e",
          600: "#a97849",
          700: "#8c5f3c",
          800: "#734e36",
          900: "#5e412f",
          950: "#352218",
        },
        dough: {
          50: "#fdfcfa",
          100: "#faf6f0",
          200: "#f4ebdd",
          300: "#ebdac3",
          400: "#dfc4a0",
          500: "#d4ad7d",
          600: "#c89256",
          700: "#a97642",
          800: "#8a5f3a",
          900: "#724f33",
          950: "#3d2819",
        },
        flour: {
          50: "#fefefe",
          100: "#fcfcfb",
          200: "#f9f8f5",
          300: "#f3f1ec",
          400: "#e8e4db",
          500: "#d9d3c6",
          600: "#c4baa8",
          700: "#a99c87",
          800: "#8b7e6a",
          900: "#726758",
          950: "#3c352d",
        },
        wheat: {
          50: "#fefcf3",
          100: "#fdf8e1",
          200: "#faefc2",
          300: "#f5e199",
          400: "#efcd69",
          500: "#e8b843",
          600: "#d99d2f",
          700: "#b47b27",
          800: "#926126",
          900: "#785023",
          950: "#412a10",
        },
        rye: {
          50: "#f7f6f5",
          100: "#edebe8",
          200: "#dbd6d0",
          300: "#c3bab0",
          400: "#a99b8d",
          500: "#968577",
          600: "#89766a",
          700: "#726259",
          800: "#5f524c",
          900: "#504540",
          950: "#2a2421",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-lato)", "sans-serif"],
        century: ["var(--font-century)", "sans-serif"],
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "slide-in-left": "slideInLeft 0.8s ease-out forwards",
        "slide-in-right": "slideInRight 0.8s ease-out forwards",
        "scale-in": "scaleIn 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
