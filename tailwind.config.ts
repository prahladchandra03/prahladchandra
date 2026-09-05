import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          0: 'rgba(13, 13, 26, 1)',
          1: 'rgba(18, 18, 32, 1)',
          2: 'rgba(26, 26, 46, 1)',
          glass: 'rgba(13, 13, 26, 0.75)',
        },
        accent: {
          cyan: '#00d4ff',
          emerald: '#00e5a0',
          violet: '#a855f7',
          blue: '#4f8ef7',
          pink: '#f472b6',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.10)',
          medium: 'rgba(255, 255, 255, 0.16)',
          accent: 'rgba(0, 212, 255, 0.35)',
        },
        fg: {
          DEFAULT: 'rgba(244, 244, 255, 1)',
          muted: 'rgba(176, 176, 204, 1)',
          dim: 'rgba(96, 96, 128, 1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'orbit': 'orbit 12s linear infinite',
        'dash': 'dash 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        dash: {
          to: { strokeDashoffset: '-20' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-accent':
          'linear-gradient(135deg, #06b6d4, #10b981, #8b5cf6)',
        'gradient-accent-soft':
          'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(16,185,129,0.15), rgba(139,92,246,0.15))',
      },
      boxShadow: {
        glow: '0 0 30px rgba(6, 182, 212, 0.15)',
        'glow-lg': '0 0 60px rgba(6, 182, 212, 0.2)',
        'glow-accent': '0 0 40px rgba(6, 182, 212, 0.25)',
        card: '0 4px 30px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 50px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config;
