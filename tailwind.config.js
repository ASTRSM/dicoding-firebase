/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/**/*.html', './dist/**/*.js'],
  purge: ["./src/**/*.html", "./src/**/*.{js, jsx, ts, tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

