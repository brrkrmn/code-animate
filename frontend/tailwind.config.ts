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
      tablet: "600px",
      laptop: "1024px",
    },
  },
  darkMode: "class",
  defaultTheme: "dark",
  plugins: [
    nextui({
      themes: {
        dark: {
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
