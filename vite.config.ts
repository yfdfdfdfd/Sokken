import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Viteの設定
export default defineConfig({
  plugins: [
    vue(), // Vueプラグインを使用
  ],
  server: {
    host: '0.0.0.0', // 外部アクセスを許可
    port: 5173,      // 任意のポート番号
    strictPort: true // ポートが使用中の場合エラーを出す
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // '@'をsrcフォルダにエイリアス
    }
  }
})
