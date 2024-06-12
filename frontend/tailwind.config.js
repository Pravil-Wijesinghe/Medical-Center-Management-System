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
        'custom-blackGreen': '#344837',
        'custom-red': '#C02027',
        'custom-black': '#19241A',
        
      },
    },
    fontFamily: {
      'montserrat': ["Montserrat", "sans-serif"],
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

