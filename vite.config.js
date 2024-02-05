import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@AppCerp': `${path.resolve(__dirname, 'src')}/AppCerp`,
      '@utils': `${path.resolve(__dirname, 'src')}/@utils`,
      '@gull': `${path.resolve(__dirname, 'src')}/@gull`,
      '@history.js': `${path.resolve(__dirname, 'src')}/@history`,
    }
  },
})
