import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves the site from /portfolio/
export default defineConfig({
  base: process.env.BASE_PATH ?? '/portfolio/',
  plugins: [react(), tailwindcss()],
})
