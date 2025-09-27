import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',  // important for Vercel
  build: {
    outDir: 'dist'
  },
  server: {
    historyApiFallback: true  // ensures React Router works in dev
  }
})
