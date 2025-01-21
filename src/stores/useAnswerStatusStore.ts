import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js'

const serializer = {
  serialize: (value: any) => {
    const jsonString = JSON.stringify(value)
    return CryptoJS.AES.encrypt(jsonString, 'secret-key').toString()
  },
  deserialize: (value: string) => {
    const bytes = CryptoJS.AES.decrypt(value, 'secret-key')
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedString)
  }
}

export const useAnswerStatusStore = defineStore('answerstatus', {
  state: () => ({
    status: undefined as { isCorrect: boolean | null; questionId: number }[] | undefined
  }),
  actions: {
    initStatus(length: number) {
      this.status = Array.from({ length }, (_, i) => ({
        isCorrect: null,
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
    storage: sessionStorage,
    serializer
  }
})
