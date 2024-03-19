/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': "426px",
      // => @media (min-width: 576px) { ... }

      'md': "769px",
      // => @media (min-width: 960px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
