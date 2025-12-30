/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'SF Pro Text', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        bg: '#020617',
        'bg-elevated': '#020617',
        accent: '#4f46e5',
      },
    },
  },
  plugins: [],
}


