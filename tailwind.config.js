/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', "Arial", "sans-serif"],
        roboto: ['"Roboto"', "Arial", "sans-serif"],
      },
      colors: {
        "brand-blue": "#0d47a1",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "900px", // Match media.css breakpoint
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
