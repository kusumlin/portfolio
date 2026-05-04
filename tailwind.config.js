/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      animation: {
        'window-open': 'windowOpen 0.22s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'bounce-dock': 'bounceDock 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        'typing-dot': 'typingDot 1.4s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        windowOpen: {
          '0%': { transform: 'scale(0.88) translateY(12px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceDock: {
          '0%,100%': { transform: 'translateY(0) scale(1)' },
          '40%': { transform: 'translateY(-14px) scale(1.18)' },
        },
        typingDot: {
          '0%,60%,100%': { transform: 'translateY(0)', opacity: '0.35' },
          '30%': { transform: 'translateY(-5px)', opacity: '1' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
