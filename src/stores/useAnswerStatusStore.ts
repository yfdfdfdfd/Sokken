import { defineStore } from 'pinia'

export const useAnswerStatusStore = defineStore('answerstatus', {
  state: () => ({
    status: undefined as
      | { isCorrect: boolean | null; questionId: number; commentary: string }[]
      | undefined
  }),
  actions: {
    initStatus(length: number) {
      this.status = Array.from({ length }, (_, i) => ({
        isCorrect: null,
        commentary: '',
        questionId: i + 1
      }))
    },
    setStatus(index: number, value: boolean) {
      if (this.status) {
        this.status[index].isCorrect = value
      } else {
        throw new Error('status is not initialized')
      }
    },
    getStatus() {
      if (this.status) {
        return this.status
      } else {
        throw new Error('status is not initialized')
      }
    }
  },
  persist: {
    storage: sessionStorage
  }
})
