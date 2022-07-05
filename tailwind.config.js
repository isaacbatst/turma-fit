/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/application/frontend/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"]
      }
    },
  },
  plugins: [],
}
