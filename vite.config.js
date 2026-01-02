import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Ensure _redirects is copied to dist
      input: {
        main: 'index.html',
        redirects: 'public/_redirects',
      },
      output: {
        // No special output config needed for static assets
      },
    },
  },
})
