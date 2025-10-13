import type { Config } from "tailwindcss";

export default {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#000000",
          white: "#FFFFFF",
          phosphor: "#39C463",
          slate: "#8298AB",
        },
      },
      boxShadow: {
        glow: "0 0 60px rgba(57,196,99,0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
