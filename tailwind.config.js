/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'neon-glow': {
          '0%': { boxShadow: '0 0 10px #87CEEB, 0 0 20px #87CEEB, 0 0 30px #87CEEB' },
          '50%': { boxShadow: '0 0 20px #87CEEB, 0 0 30px #87CEEB, 0 0 40px #87CEEB' },
          '100%': { boxShadow: '0 0 10px #87CEEB, 0 0 20px #87CEEB, 0 0 30px #87CEEB' },
        },
      },
      animation: {
        'neon-glow': 'neon-glow 2s infinite alternate',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

