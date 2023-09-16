/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js, jsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["sans-serif"],
      roboto: ["Roboto", "system-ui"],
      comic: ['"Comic Sans MS"', "cursive"],
      mooli: ["mooli", "system-ui"],
    },
  },
  plugins: [],
};
