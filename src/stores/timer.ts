// storeの変数、メソッドは直接変更せず、外部に新しい変数に代入して利用する！
import { defineStore } from 'pinia'

function dtime() {
  return Math.floor(new Date().getTime() / 1000)
}

export const useTimerStore = defineStore('timer', {
  state: () => ({
    endTime: undefined as number | undefined,
    startTime: undefined as number | undefined,
    finishtime: 0
  }),
  getters: {
    getPastTime(): number {
      if (this.startTime !== undefined) {
        return dtime() - this.startTime
      }
      return 0
    },
    getNowTime(): number {
      return dtime()
    }
  },
  actions: {
    getDiff(): number {
      if (this.endTime !== undefined) {
        return this.endTime - dtime()
      }
      return 0
    },
    setTimer(time: number) {
      this.endTime = time + dtime()
      this.startTime = dtime()
    },
    setFinishTime(time: number) {
      this.finishtime = time
    }
  },

  persist: {
    storage: sessionStorage
  }
})
