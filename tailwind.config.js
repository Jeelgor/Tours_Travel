/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightblue: "#7968fc",
        navbar_color:'#95a5a6',
      },
    },
  },
  plugins: [],
};
