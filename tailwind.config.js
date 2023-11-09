/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: ['light'],
  },
  plugins:
    [
      require("daisyui"),
      require("@tailwindcss/forms"),
      require('flowbite/plugin'),
    ]
}

