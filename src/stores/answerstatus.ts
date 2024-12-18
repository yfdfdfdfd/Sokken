import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAnswerStatusStore = defineStore('answerstatus', () => {
    const status = ref<((boolean)[] | undefined)>(undefined)

    //問題数の数だけundefinedを入れた配列を作成
    function initStatus(length: number) {
        status.value = Array(length).fill(undefined)
    }
    
    function setStatus(index: number, value: boolean) {
        //もしstatusが初期化されていれば、valueを代入
        if (status.value) {
            status.value[index] = value
        }else {
            throw new Error('status is not initialized')
        }
    }

    function getStatus() {
        if (status.value) {
            return status.value
        } else {
            // undefinedのerrorを回避するため
            throw new Error('status is not initialized')
        }
    }
    return { initStatus, setStatus, getStatus }
})
