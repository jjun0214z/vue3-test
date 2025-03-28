import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://67d7e9329d5e3a10152c84bd.mockapi.io', // API 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 필요에 따라 경로 재작성
      },
    },
  },
})
