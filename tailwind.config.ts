import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          50: "#eaffff",
          100: "#c9fbff",
          200: "#93f6ff",
          300: "#55ebff",
          400: "#19dbff",
          500: "#00bfe6",
          600: "#0095b4",
          700: "#007088",
          800: "#055e71",
          900: "#084e5e"
        }
      },
      boxShadow: {
        glow: "0 0 25px rgba(25, 219, 255, 0.35)"
      },
      backgroundImage: {
        "grid-fade": "radial-gradient(circle at 20% 20%, rgba(25,219,255,0.25), transparent 40%), radial-gradient(circle at 80% 60%, rgba(208,0,255,0.2), transparent 40%)"
      }
    }
  },
  plugins: []
};
export default config;
