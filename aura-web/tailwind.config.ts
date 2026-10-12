import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bizhub: {
          black: '#08090C',
          dark: '#0F1117',
          card: '#161922',
          gold: '#F5B82E',
          goldDark: '#D69E20',
          goldLight: '#FDE047',
          blue: '#1457B8',
          blueLight: '#2563EB',
          cyan: '#18BCE5',
          green: '#16A56A',
          greenLight: '#22C55E',
          lightBg: '#F5F7FB',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 4px 20px -2px rgba(245, 184, 46, 0.25)',
        goldGlow: '0 0 25px rgba(245, 184, 46, 0.35)',
        card: '0 10px 30px -5px rgba(8, 9, 12, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
