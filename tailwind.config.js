/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./student.html",
    "./teacher.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ibmFont: ['"IBM Plex Sans KR"', "sans-serif"]
      },
    },
  },
  plugins: [],
}