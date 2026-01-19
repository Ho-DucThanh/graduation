/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#FFFEF8",
          100: "#FFFBEA",
        },
        gold: {
          50: "#FFF8E6",
          100: "#FDECC8",
          200: "#F8DFA3",
          300: "#F2C96D",
        },
        navy: {
          900: "#0B1B3B",
          800: "#0F2552",
          700: "#143066",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(11, 27, 59, 0.10)",
      },
    },
  },
  plugins: [],
};
