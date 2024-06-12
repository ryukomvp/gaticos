/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.html", "./controllers/**/*.js", "./resources/error/*.html", "./node_modules/flowbite/**/*.js"],
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

