/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        accent: '#7b2ff7',
        accent2: '#ff3d8f',
        accent3: '#00d4b8',
      },
    },
  },
  plugins: [],
}
