import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true, // required: the sandbox serves the app through a proxied preview host
    watch: {
      // Build artefacts and docs are not part of the dev module graph.
      // Watching them caused full-page reloads while viewers had the app open.
      ignored: ['**/dist/**', '**/docs/**', '**/ann-setu-prototype.html', '**/.standalone-tmp/**']
    }
  },
  preview: { host: '0.0.0.0', port: 4173, allowedHosts: true }
})
