/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorPrimary: "#EE5B47",
        colorPrimary2: "#f59d91",
        colorPrimary3: "#f7ada3",
        colorSecondary: "#043730",
        colorSecondary2: "#3C6761",
        colorBlue: "#1DA1F2",
        colorGray: "#6C707B",
        colorGray2: "#f0f1f2",
        colorWhite: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
