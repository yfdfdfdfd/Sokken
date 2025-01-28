import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
  // 初期状態
  state: () => ({
    user: undefined as { token: string } | undefined
  }),

  // ゲッター
  getters: {
    isAuthenticated: (state) => state.user !== undefined,
    getToken(state): string | undefined {
      return state.user?.token
    }
  },

  // アクション
  actions: {
    login(user: { token: string }) {
      this.user = user
    },

    logout() {
      this.user = undefined
    }
  }
})
