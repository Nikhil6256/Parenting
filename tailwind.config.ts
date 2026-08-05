import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50:  '#fdf2f6',
          100: '#fce4ed',
          200: '#fbcbdd',
          300: '#f7a3c0',
          400: '#f0719d',
          500: '#e54880',
          600: '#cc2d65',
          700: '#ab2154',
          800: '#8e1f47',
          900: '#761f3e',
          950: '#470b20',
        },
        beige: {
          50:  '#fdf8f0',
          100: '#faf0dc',
          200: '#f4ddb5',
          300: '#edc485',
          400: '#e4a554',
          500: '#dc8d31',
          600: '#cc7526',
          700: '#aa5d21',
          800: '#884a23',
          900: '#6e3d1f',
          950: '#3b1e0e',
        },
        blush: {
          50:  '#fef6f8',
          100: '#fdedf1',
          200: '#fbdae4',
          300: '#f7bace',
          400: '#f18dae',
          500: '#e8608d',
          600: '#d63d72',
          700: '#b82e5c',
          800: '#9a2a51',
          900: '#832848',
          950: '#491223',
        },
        mist: {
          50:  '#f1f7fd',
          100: '#e2eefb',
          200: '#beddf5',
          300: '#85c3ed',
          400: '#45a4e1',
          500: '#1f88ce',
          600: '#126aad',
          700: '#11558c',
          800: '#124974',
          900: '#143e61',
          950: '#0e2841',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #fdf2f6 0%, #fdf8f0 50%, #fce4ed 100%)',
        'sage-gradient': 'linear-gradient(135deg, #e54880 0%, #cc2d65 100%)',
        'warm-gradient': 'linear-gradient(135deg, #fdf2f6 0%, #fce4ed 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(253,242,246,0.8) 100%)',
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(229, 72, 128, 0.08)',
        'soft-lg': '0 8px 40px rgba(229, 72, 128, 0.12)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 12px 40px rgba(229, 72, 128, 0.15)',
      },
      borderRadius: {
        'xl2': '1.25rem',
        'xl3': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
