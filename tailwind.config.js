/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    themeVariants: ['dark'],
    extend: {},
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms')],
};
