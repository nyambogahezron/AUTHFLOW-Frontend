import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    proxy: {
      '/api': {
        'https://deploy-test-k0b3.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
