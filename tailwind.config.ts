// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b91c1c", // red
        accent: "#ffffff",  // white
        dark: "#1f1f1f",    // optional dark background
      },
    },
  },
  plugins: [],
};

export default config;
