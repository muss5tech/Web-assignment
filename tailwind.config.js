/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '325px',
      },
      colors: {
        light: {
          bg: {
            primary: '#ffffff',
            secondary: '#f8fafc',
            tertiary: '#f1f5f9',
            card: '#ffffff',
            hover: '#f1f5f9',
          },
          text: {
            primary: '#0f172a',
            secondary: '#475569',
            tertiary: '#64748b',
            muted: '#94a3b8',
          },
          border: {
            primary: '#cbd5e1',
            secondary: '#e2e8f0',
            hover: '#94a3b8',
          },
        },

        background: {
          primary: '#0a0a0f',
          secondary: '#12121a',
          tertiary: '#1a1a24',
          card: '#1a1a24',
          hover: '#242432',
        },
        foreground: {
          primary: '#ffffff',
          secondary: '#e2e8f0',
          tertiary: '#cbd5e1',
          muted: '#94a3b8',
        },
        border: {
          primary: '#334155',
          secondary: '#1e293b',
          hover: '#475569',
        },

        accent: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          tertiary: '#06b6d4',
          hover: '#818cf8',
        },

        status: {
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
          online: '#22c55e',
          offline: '#ef4444',
        },

        tech: {
          frontend: '#3b82f6',
          mobile: '#10b981',
          backend: '#f59e0b',
          devops: '#ef4444',
          others: '#8b5cf6',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-accent': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)',
        'shimmer-gradient':
          'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(99, 102, 241, 0.3)',
        'glow-md': '0 0 30px rgba(99, 102, 241, 0.4)',
        'glow-lg': '0 0 50px rgba(99, 102, 241, 0.5)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
