// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b91c1c", // Red
        accent: "#ffffff",  // White
        dark: "#1f1f1f",    // Optional background
      },
    },
  },
  plugins: [],
};

export default config;
