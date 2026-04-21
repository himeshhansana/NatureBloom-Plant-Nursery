
export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        nature: {
          50: '#F0FFF4',
          100: '#D8F3DC',
          200: '#B7E4C7',
          300: '#95D5B2',
          400: '#74C69D',
          500: '#52B788',
          600: '#40916C',
          700: '#2D6A4F',
          800: '#1B4332',
          900: '#081C15',
        },
        earth: {
          50: '#FEFAE0',
          100: '#F5E6CC',
          200: '#DDA15E',
          300: '#BC6C25',
          400: '#8B6914',
        },
        cream: '#FDFCF7',
        sage: '#E8F0E4',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.06)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.08)',
        'glass-xl': '0 24px 64px rgba(0, 0, 0, 0.1)',
        'soft': '0 2px 8px rgba(45, 106, 79, 0.08)',
        'soft-lg': '0 4px 16px rgba(45, 106, 79, 0.12)',
        'glow': '0 0 24px rgba(82, 183, 136, 0.2)',
      },
      backdropBlur: {
        'glass': '16px',
      },
    },
  },
}
