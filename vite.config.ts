import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: mode === 'production' ? '/Web-Portfolio' : '/',
  resolve: {
    alias: {
      // '@': '/src',
      '@icons': './icons', // This works for public/icons
    },
  },
}))
