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
    status: undefined as { isCorrect: boolean | null; questionId: number }[] | undefined,
    selectedOptions: [] as string[]
  }),
  actions: {
    initStatus(length: number) {
      this.status = Array.from({ length }, () => ({
        isCorrect: null,
        questionId: Math.floor(Math.random() * 287)
      }))
    },
    setStatus(index: number, value: boolean) {
      if (this.status) {
        this.status[index].isCorrect = value
      } else {
        throw new Error('status is not initialized')
      }
    },
    getStatusAll() {
      if (this.status) {
        console.log(this.status)
        return this.status
      } else {
        throw new Error('status is not initialized')
      }
    },
    getStatus(index: number) {
      if (this.status) {
        return this.status[index]
      } else {
        throw new Error('status is not initialized')
      }
    },
    setSelectedOption(index: number, option: string) {
      this.selectedOptions[index] = option
    }
  },
  persist: {
    storage: sessionStorage,
    serializer
  }
})
