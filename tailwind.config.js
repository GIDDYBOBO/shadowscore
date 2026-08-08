/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#07090E',
          800: '#0B0E14',
          700: '#121721',
          600: '#181F2C',
          500: '#222A3E',
          400: '#2E3A52',
          border: '#1F283A',
        },
        brand: {
          cyan: '#00F0FF',
          blue: '#2563EB',
          sky: '#38BDF8',
          purple: '#8B5CF6',
          green: '#10B981',
          danger: '#F43F5E',
          warning: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(37, 99, 235, 0.4)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orb-rotate': 'orbRotate 20s linear infinite',
      },
      keyframes: {
        orbRotate: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.05)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
