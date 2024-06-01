/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.html", "./controllers/public/template.js", "./controllers/public/template-v2.js","./resources/error/*.html", "./node_modules/flowbite/**/*.js"],
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

