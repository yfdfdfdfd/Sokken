// storeの変数、メソッドは直接変更せず、外部に新しい変数に代入して利用する！
import { defineStore } from 'pinia'

// export const useTimerStore = defineStore('timer', () => {
//   const endTime = ref<number | undefined>(undefined)
//   const startTime = ref<number | undefined>(undefined)
//   const finishtime = ref<number>(0)

//   function setTimer(time: number) {
//     endTime.value = time + dtime() // 現在時刻 + 設定した時間をタイマーにセット (終わる時間)
//     startTime.value = dtime() // 現在時刻をタイマーのスタート時間としてセット
//   }

//   function dtime() {
//     return Math.floor(new Date().getTime() / 1000) // 現在時刻を秒単位で返す
//   }

//   function getDiff() {
//     // タイマーの残り時間を返す
//     if (endTime.value !== undefined) {
//       return endTime.value - dtime()
//     }
//     return 0
//   }
//   //タイマーの経過時間を返す関数を追加
//   function getPastTime() {
//     if (startTime.value !== undefined) {
//       return dtime() - startTime.value
//     }
//     return 0
//   }
//   function setFinishTime(time: number) {
//     finishtime.value = time
//   }
//   //今の時間を返す関数を追加
//   function getNowTime() {
//     return dtime()
//   }
//   return { endTime, setTimer, getDiff, getPastTime, setFinishTime, finishtime, getNowTime }
// })

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
