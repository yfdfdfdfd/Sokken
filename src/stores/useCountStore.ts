//解いた問題数をカウントしておくストア
import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    },
    reset() {
      this.count = 0
    }
  },
  persist: {
    storage: sessionStorage
  }
})
