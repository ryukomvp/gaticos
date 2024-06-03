/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/public/*.html", "./controllers/public/template.js", "./resources/error/*.html", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

