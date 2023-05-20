/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      screens: {
        sm: '500px'
      },
      colors: {
        'pgl-blue': '#017CC2'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
