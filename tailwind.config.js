/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'black-shaft': {
          '50': '#f6f7f7',
          '100': '#e1e5e6',
          '200': '#c2cbcd',
          '300': '#9ca9ac',
          '400': '#77858a',
          '500': '#5d6a6f',
          '600': '#495358',
          '700': '#3d4548',
          '800': '#33393c',
          '900': '#151718',
        },
        'port-gore': {
          '50': '#eff0fe',
          '100': '#e2e3fd',
          '200': '#cbcbfa',
          '300': '#acabf6',
          '400': '#938aef',
          '500': '#826ee6',
          '600': '#7252d9',
          '700': '#6243bf',
          '800': '#51399a',
          '900': '#2c2250',
        },
      },
      fontFamily: {
        'general-sans': ['General Sans', 'sans-serif'],
        'chillax': ['Chillax', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
