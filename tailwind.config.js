/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightblue: "#7968fc",
        Darkblue: "#130F40",
        Skyblue: "#30C6D8",
        navbar_color:'#95a5a6',
      },
    },
  },
  plugins: [],
};
