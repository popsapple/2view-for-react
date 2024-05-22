/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss';'tailwindcss/plugin';

export default {
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.fa-play': {
          'content-visibility': 'auto',
        },
      })
    })
  ],
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
}