/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorPrimary: "#DAAA63",
        colorSecondary: "#ada5a1",
        colorSecondary2: "#b8b2ae",
        colorSecondary3: "#797371",
        colorBg: "#f8f3ed",
        colorWhite: "#FFFFFF",
        colorBlack: "#2c1810",
      },
      fontFamily: {
        mons: "'Montserrat', 'sans-serif'",
        calson: "'Libre Caslon Text', 'serif'",
      },
    },
  },
  plugins: [],
};
