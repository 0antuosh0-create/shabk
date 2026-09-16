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
        canvas: {
          light: '#f8f5ee',
          dark: '#0b1320',
          card: '#ffffff',
          'card-dark': '#131e30',
        },
        ink: {
          primary: '#0f1f33',
          secondary: '#475569',
          muted: '#64748b',
          light: '#f8fafc',
          'light-muted': '#94a3b8',
        },
        net: {
          blue: '#0284c7',
          cyan: '#0ea5e9',
          green: '#059669',
          amber: '#d97706',
          purple: '#7c3aed',
          rose: '#e11d48',
        },
      },
      fontFamily: {
        sans: ['Vazirmatn', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(15, 31, 51, 0.05), 0 1px 2px -1px rgba(15, 31, 51, 0.05)',
        card: '0 4px 6px -1px rgba(15, 31, 51, 0.06), 0 2px 4px -2px rgba(15, 31, 51, 0.05)',
        elevated: '0 10px 15px -3px rgba(15, 31, 51, 0.08), 0 4px 6px -4px rgba(15, 31, 51, 0.05)',
      }
    },
  },
  plugins: [],
}
