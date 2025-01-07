import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mobile: "425px",
      tablet: "768px",
      laptop: "1024px",
    },
    extend: {
      animation: {
        slide: "slideInFromTop 1s ease-in-out",
      },
      keyframes: {
        slideInFromTop: {
          "0%": {
            transform: "translateY(-6%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
    },
  },
  darkMode: "class",
  defaultTheme: "dark",
  plugins: [
    nextui({
      themes: {
        dark: {
          layout: {
            borderWidth: {
              small: "1px",
            },
            hoverOpacity: 0.9,
            boxShadow: {
              large:
                "inset 0 0 0 1px rgba(216,236,248,.2), inset 0 0 20px 2px rgba(168,216,245,.2), 0 0 0 0 rgba(0,0,0,.3)",
              medium:
                "inset 0 1px 1px 0 rgba(216,236,248,.2), inset 0 0 48px 0 rgba(168,216,245,.06), 0 16px 32px rgba(0,0,0,.3)",
              small:
                "inset 0 1px 1px 0 rgba(199,211,234,.12), inset 0 24px 48px 0 rgba(199,211,234,.05)",
            },
          },
          colors: {
            background: "#05060f",
            foreground: { DEFAULT: "#c7d3ea", 50: "#d1e4fa", 100: "#c7d3eaa3" },
            divider: "#bacff71f",
            content1: "#bad6f703",
            content2: "#bad6f70f",
          },
        },
      },
    }),
  ],
} satisfies Config;
