/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.hbs', './public/**/*.js'],
  theme: {
    themeVariants: ['dark'],
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class',
};
