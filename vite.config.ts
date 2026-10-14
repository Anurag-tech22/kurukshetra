import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config with base set for GitHub Pages deployment
export default defineConfig({
  plugins: [react()],
  base: '/kurukshetra/',
  server: {
    port: 5173,
  },
})
