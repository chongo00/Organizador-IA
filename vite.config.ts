import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Importante para Electron
  server: {
    port: 3000, // You can change this to any port you want
    open: true // Automatically open the app in the browser
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
