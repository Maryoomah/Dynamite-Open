/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {},
    colors: {
      primary: '#050922',
      secondary: "#3B5BA9",
      darkprimary: "#100E1F",
      white: '#fff',
      black: '#000',
      ash: "rgb(148 163 184)",
      blue: "#000080",
    },
    
    fontFamily: {
      outfit: ["Outfit", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      mont: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
}
