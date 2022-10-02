/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorPrimary: "#E8484B",
        colorPrimaryLight: "#FF6966",
        colorPrimaryLight2: "#FF8983",
        colorPrimaryLight3: "#FFAAA1",
        // colorPrimary: "#00c1ef",
        // colorPrimaryLight: "#FF6966",
        // colorPrimaryLight2: "#FF8983",
        // colorPrimaryLight3: "#FFAAA1",
        colorWhite: "#FFFFFF",
        colorBlack: "#1c1d22",
        colorbg: "#fbfbfb",

        colorGray: "#8e8e91",
        colorGray2: "#606164",
        colorGray3: "#494a4e",
      },
    },
  },
  plugins: [],
};
