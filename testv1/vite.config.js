import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

const repoName = 'hub-city-transit-v2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  base: `/${repoName}/`
})
