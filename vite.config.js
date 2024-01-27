import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    proxy: {
      '/api': {
        target: 'https://auth-flow-api-3e9v.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
