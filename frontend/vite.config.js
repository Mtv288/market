import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    cors: true,
    allowedHosts: ['.ngrok-free.app'], // разрешает все поддомены ngrok, это для разработки потом убрать надо будет
  },
})
