/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nude: {
          50: "#fefaf5",
          100: "#f7f2ed",
          200: "#e9ddd1",
          300: "#d7c3ac",
          400: "#c9b6a0", // hoofdaccent
        },
        sand: {
          100: "#f2eae2",
          200: "#e1d8cf",
          300: "#c2b1a4",
        },
        brown: {
          100: "#9c8f85",
          200: "#7b5e48",
          300: "#5f5247",
          400: "#422c1b", // headlines
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
