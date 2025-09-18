import { defineConfig } from '@tailwindcss/vite'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 기존 palette.ts와 동일
        'white': '#ffffff',
        'black': '#1a1a1a',
        'light-gray': '#f3f4f6',
        'gray': '#e5e7eb',
        'dark-gray': '#3a3a3a',
        'deep-gray': '#2a2a2a',
        'red': '#dc2626',
        'light-red': '#fef2f2',
        'pink': '#fca5a5',
        'purple': '#8b5cf6',
        'dark-background': '#1a1a1a',
        'light-background': '#fafafa',
        
        // 테마별 색상 (기존 theme.ts와 매핑)
        'theme-bg': 'var(--theme-bg)',
        'theme-text': 'var(--theme-text)',
        'theme-component-bg': 'var(--theme-component-bg)',
        'theme-border': 'var(--theme-border)',
        'theme-button-bg': 'var(--theme-button-bg)',
        'theme-button-text': 'var(--theme-button-text)',
        'theme-input-bg': 'var(--theme-input-bg)',
        'theme-hover-bg': 'var(--theme-hover-bg)',
        'theme-error-bg': 'var(--theme-error-bg)',
        'theme-error-text': 'var(--theme-error-text)',
      },
      borderRadius: {
        'theme': '12px',
        'theme-sm': '8px',
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color',
      }
    },
  },
  plugins: [],
})