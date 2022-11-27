/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'black-shaft': {
          '50': '#f7f7f7',
          '100': '#e3e3e3',
          '200': '#c8c8c8',
          '300': '#a4a4a4',
          '400': '#818181',
          '500': '#666666',
          '600': '#515151',
          '700': '#434343',
          '800': '#383838',
          '900': '#242424',
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
