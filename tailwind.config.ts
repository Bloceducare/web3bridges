import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        page: 'rgb(var(--page) / <alpha-value>)',
        page2: 'rgb(var(--page2) / <alpha-value>)',
        page3: 'rgb(var(--page3) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        brand: {
          red: '#E63946',
          black: '#0a0a0a',
          dark: '#111111',
          darker: '#080808',
          card: '#0f0f0f',
          border: '#1e1e1e',
          muted: '#555555',
          dim: '#333333',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-red': 'linear-gradient(rgba(230,57,70,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}
export default config
