import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves the site from /portfolio/, Vercel from the root
export default defineConfig({
  base: process.env.BASE_PATH ?? (process.env.VERCEL ? '/' : '/portfolio/'),
  plugins: [react(), tailwindcss()],
})
