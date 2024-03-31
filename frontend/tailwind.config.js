/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ], 
  theme: {
    extend: {
      colors: {
        'custom-lightGreen': '#62BD56',
        'custom-darkGreen': '#0E9549',
      },
    },
  },
  plugins: [],
}

