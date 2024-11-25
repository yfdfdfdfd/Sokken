// storeの変数、メソッドは直接変更せず、外部に新しい変数に代入して利用する！
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
    const timer = ref<number | undefined>(undefined)

    function setTimer(time: number) {
        timer.value = time + dtime() // 現在時刻 + 設定した時間をタイマーにセット
    }

    function dtime() {
        return Math.floor(new Date().getTime() / 1000) // 現在時刻を秒単位で返す
    }

    function getDiff() {
        if (timer.value !== undefined) {
            return timer.value - dtime()
        }
        return 0
    }
    return { timer, setTimer, getDiff }
})




