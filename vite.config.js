import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000", // backend server
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
