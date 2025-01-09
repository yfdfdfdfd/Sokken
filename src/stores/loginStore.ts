import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
  // 初期状態
  state: () => ({
    isLoggedIn: false,
    user: null as { id: number; name: string } | null
  }),

  // ゲッター
  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
    userName: (state) => state.user?.name || 'ゲスト'
  },

  // アクション
  actions: {
    login(user: { id: number; name: string }) {
      this.isLoggedIn = true
      this.user = user
    },

    logout() {
      this.isLoggedIn = false
      this.user = null
    }
  }
})
