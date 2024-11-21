/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#e6e6f2',
          100: '#c3c3e0',
          200: '#9d9dc9',
          300: '#7a7ab3',
          400: '#5c5c9e',
          500: '#404080',
          600: '#2d2d5f',
          700: '#1c1c3f',
          800: '#0f0f2a',
          900: '#070716'
        },
        brand: {
          50: '#e6f1ff',
          100: '#b8dcff',
          200: '#8ac6ff',
          300: '#5cb0ff',
          400: '#2e9aff',
          500: '#0084ff',
          600: '#0069cc',
          700: '#004d99',
          800: '#003266',
          900: '#001633'
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
      boxShadow: {
        'dark-subtle': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}