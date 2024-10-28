import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Viteの設定
export default defineConfig({
  plugins: [
    vue(), // Vueプラグインを使用
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // '@'をsrcフォルダにエイリアス
    }
  }
})
