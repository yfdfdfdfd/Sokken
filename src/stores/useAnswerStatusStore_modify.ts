import { defineStore } from 'pinia'

export const useAnswerStatusStore = defineStore('answerstatus', {
  state: () => ({
  status: undefined as {
    isCorrect: boolean | null;
    questionId: number;
    timeTaken: number | null;    // ← 追加
  }[] | undefined
  }),
  actions: {
    initStatus(length: number) {
      this.status = Array.from({ length }, (_, i) => ({
        isCorrect: null,
        questionId: i + 1,
      timeTaken: null           // 初期値
      }))
    },

    // 第2引数をオブジェクトにして、正答だけでなく timeTaken も渡せるようにする
    setStatus(index: number, payload: { isCorrect: boolean, timeTaken?: number }) {
      //setStatus(questionId: number, payload: { isCorrect: boolean; timeTaken?: number }) {
        if (!this.status) {
          throw new Error('status is not initialized')
        }
    
         // 配列から "questionId" に一致する要素を探す
        //const found = this.status.find(item => item.questionId === questionId)
        //if (!found) {
          //  throw new Error(`No question found for questionId = ${questionId}`)
        //}
        //if (this.status) {
        // status が確保されていれば更新
        // index番目の isCorrect を更新
      this.status[index].isCorrect = payload.isCorrect
  
      // timeTaken があれば更新（undefinedなら変更しない）
       if (typeof payload.timeTaken !== 'undefined') {
         this.status[index].timeTaken = payload.timeTaken
       }
      //found.isCorrect = payload.isCorrect
      //if (payload.timeTaken !== undefined) {
      //    found.timeTaken = payload.timeTaken
      //}
    },
    //   } else {
    //     throw new Error('status is not initialized')
    //   }
    // },

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