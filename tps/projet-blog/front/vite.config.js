import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:true,
    port:9009,
    proxy: {
      '/api': {
        target: 'http://localhost:1238', 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
