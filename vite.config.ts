import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        return () => {
          server.middlewares.use((req, res, next) => {
            if (req.method === 'GET' && !req.url.includes('.') && req.url !== '/') {
              req.url = '/index.html'
            }
            next()
          })
        }
      }
    }
  ]
})
