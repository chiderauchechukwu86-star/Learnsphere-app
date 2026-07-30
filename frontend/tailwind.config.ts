import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#171821',
        paper: '#FAF9F6',
        card: '#FFFFFF',
        line: '#E4E2DA',
        muted: '#767389',
        brand: {
          DEFAULT: '#4B3FE4',
          dark: '#3A2FC0',
          light: '#EDEBFC',
        },
        amber: {
          DEFAULT: '#F2A93B',
          dark: '#C9821F',
          light: '#FCEED2',
        },
        sage: {
          DEFAULT: '#2F9E6E',
          dark: '#237A55',
          light: '#DFF3E9',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(23,24,33,0.04), 0 8px 24px -8px rgba(23,24,33,0.10)',
        lift: '0 12px 32px -8px rgba(75,63,228,0.28)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.6s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
};
export default config;
