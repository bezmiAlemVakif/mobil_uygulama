import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  publicDir: 'public',
  server: {
    host: '::',
    port: 5173
  },
  optimizeDeps: {
    force: true,
    exclude: ['@ionic/core/components']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    assetsDir: 'assets',
    outDir: 'dist'
  }
})
