/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: '#c81030',
        'primary-light': 'rgba(200, 16, 46, 0.1)',
        'primary-shadow': 'rgba(200, 16, 46, 0.2)',
        'primary-dark': '#a00828',
        
        gold: '#f5a623',
        'gold-light': 'rgba(245, 166, 35, 0.1)',
        'gold-text': '#7a4f00',
        'gold-dark': '#d97f0e',
        
        // Semantic colors
        error: '#dc2626',
        'error-light': 'rgba(220, 38, 38, 0.1)',
        'error-dark': '#991b1b',
        
        success: '#16a34a',
        'success-light': 'rgba(22, 163, 74, 0.1)',
        
        warning: '#f59e0b',
        'warning-light': 'rgba(245, 158, 11, 0.1)',
        
        // Neutral palette
        neutral: {
          50: '#f9f9f9',
          100: '#f5f5f5',
          200: '#e8e8e8',
          300: '#d1d1d1',
          400: '#999999',
          500: '#666666',
          600: '#646363',
          700: '#3f3f3f',
          800: '#282828',
          900: '#1a1a1a',
          950: '#0d0d0d'
        }
      },
      spacing: {
        0.5: '2px',
        1: '4px',
        1.5: '6px',
        2: '8px',
        2.5: '10px',
        3: '12px',
        3.5: '14px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px'
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
        pill: '9999px'
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }]
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900'
      },
      boxShadow: {
        none: 'none',
        xs: '0 1px 2px rgba(0,0,0,0.05)',
        sm: '0 2px 4px rgba(0,0,0,0.08)',
        md: '0 4px 8px rgba(0,0,0,0.1)',
        lg: '0 8px 24px rgba(0,0,0,0.12)',
        xl: '0 12px 40px rgba(0,0,0,0.15)',
        '2xl': '0 16px 48px rgba(0,0,0,0.18)',
        primary: '0 4px 16px rgba(200, 16, 46, 0.2)',
        gold: '0 4px 16px rgba(245, 166, 35, 0.2)',
        glass: '0 8px 32px rgba(31, 38, 135, 0.37)'
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale': 'scale 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scale: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        }
      },
      gridTemplateColumns: {
        cards: 'repeat(auto-fit, minmax(300px, 1fr))',
        'cards-sm': 'repeat(auto-fit, minmax(250px, 1fr))',
        'cards-lg': 'repeat(auto-fit, minmax(360px, 1fr))'
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #1a0a0a 0%, #2d1015 100%)',
        'gradient-hero': 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #282828 100%)',
        'gradient-glass': 'rgba(255, 255, 255, 0.07)'
      },
      opacity: {
        glass: '0.07'
      }
    }
  },
  darkMode: 'class',
  plugins: []
}
