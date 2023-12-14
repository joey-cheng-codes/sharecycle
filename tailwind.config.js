

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: ["light"],
  },
  plugins:
    [
      require("daisyui"),
      require("@tailwindcss/forms"),
      require("flowbite/plugin"),
    ],
  theme: {
    extend: {
      screens: {
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
      },
    },
  }
};
