import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:5000/',
        target: 'https://odinbook-vercel.vercel.app/',
        changeOrigin: true,
      }
    },
  },
  plugins: [react()],
})
