<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue'
import BreadList from '@/components/BreadList.vue'
import { DefaultApi, Configuration } from '../generated'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import QuestionOption from '@/components/QuestionOption.vue'
import QuestionList from '@/components/QuestionList.vue'
import { useTimerStore } from '@/stores/useTimerStore'
import { useAnswerStatusStore } from '@/stores/useAnswerStatusStore'
import router from '@/router'

const route = useRoute()
const question = ref<string | undefined>(undefined)
const list = ref<string[]>([])
const errorMessage = ref<string | undefined>(undefined)
const answer = ref<string | undefined>(undefined)
const diff = ref<number>(0)
const intervalId = ref<number | undefined>(undefined)
const Dialog = ref<boolean>(false)
const Dialog2 = ref<boolean>(false)

const timerstore = useTimerStore()
const answerstatusstore = useAnswerStatusStore()
const { getDiff } = timerstore
const { getStatus } = answerstatusstore

const questionStartTime = ref<number>(0)
// 回答が確定したら呼び出すメソッド
function onAnswerConfirmed(questionId: number, isCorrect: boolean) {
  const endTime = Date.now()
  const timeSpent = (endTime - questionStartTime.value) / 1000 // 秒換算
  // storeに保存 (questionId, isCorrect, timeSpent)
  answerstatusstore.setStatus( questionId - 1, { isCorrect, timeTaken: timeSpent } )
  //answerstatusstore.setStatus( questionId, { isCorrect, timeTaken: timeSpent } )
}


async function fetchQuestionData() {
  try {
    const config = new Configuration({
      basePath: 'http://localhost:8000'
    })
    const response = await new DefaultApi(config).readQuestionsQuestionsQuestionIdGet({
      questionId: Number(route.params.id)
    })

    question.value = response.questionText
    answer.value = response.correctAnswer
    list.value = response.choices

    console.log('Question data:', response.id)

    if (route.params.id === '5') {
      Dialog2.value = true
      timerstore.setFinishTime(timerstore.getPastTime) // 保存
    }
  } catch (error) {
    console.error('Error fetching question data:', error)
    errorMessage.value = '問題データの取得に失敗しました'
  }
}

// setStatus(questionId: number, payload: { isCorrect: boolean; timeTaken?: number }) {
//   if (!this.status) {
//     throw new Error('status is not initialized')
//   }

//   // 配列から questionId に一致する要素を探す
//   const found = this.status.find(item => item.questionId === questionId)
//   if (!found) {
//     throw new Error(`No question found with questionId=${questionId}`)
//   }

//   found.isCorrect = payload.isCorrect
//   if (payload.timeTaken !== undefined) {
//     found.timeTaken = payload.timeTaken
//   }
// }

onMounted(() => {
  answerstatusstore.initStatus(10)
  fetchQuestionData()
  diff.value = getDiff()
  //一秒ごとにdiffを更新
  intervalId.value = setInterval(() => {
    diff.value = getDiff()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})

// idが変更された時
watch(
  () => route.params.id,
  () => {
    fetchQuestionData()
  }
)

// 制限時間切れを監視
watch(
  () => diff.value <= 0,
  (isTimeOver) => {
    if (isTimeOver) {
      Dialog.value = true
      timerstore.setFinishTime(timerstore.getPastTime) // 保存
    }
  }
)

// ダイアログが閉じられたら結果画面に遷移
watch(
  () => Dialog.value,
  (isDialogClosed) => {
    if (!isDialogClosed) {
      getStatus()
      router.replace('/result')
    }
  }
)

watch(
  () => Dialog2.value,
  (isDialogClosed) => {
    if (!isDialogClosed) {
      getStatus()
      router.replace('/result')
    }
  }
)
</script>

<template>
  <NavHeader style="position: absolute; top: 0; width: 100%" />
  <BreadList style="margin-top: 80px" />
  <main>
    <div>
      <QuestionList v-if="question" :question="question" />
      <QuestionOption
        v-if="answer"
        :answer="answer"
        :list="list"
        :id="Number(route.params.id)"
        :timer="Math.max(0, diff)"
        @answer-confirmed="onAnswerConfirmed"
      />
    </div>
    <p v-if="errorMessage" style="color: #f6aa00; margin-top: 5px">{{ errorMessage }}</p>

      <v-dialog v-model="Dialog" max-width="500">
      <v-card max-width="500" style="text-align: center">
        <v-card-title class="centered-title"> 制限時間が終了しました </v-card-title>
        <v-card-text>
          試験を終了します<br />
          クリックで結果画面に遷移します。
        </v-card-text>
        <v-card-actions>
          <v-btn class="ms-auto" @click="Dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="Dialog2" width="500">
      <v-card max-width="500" style="text-align: center">
        <v-card-title class="centered-title"> 問題が終了しました </v-card-title>
        <v-card-text>
          試験を終了します<br />
          クリックで結果画面に遷移します。
        </v-card-text>
        <v-card-actions>
          <v-btn class="ms-auto" @click="Dialog2 = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<style scoped>
main {
  display: flex;
}

main > * {
  flex: 1;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.centered-title {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.2rem;
  background-color: auto;
  color: auto;
}

.ms-auto {
  margin-right: 105px;
}
</style>
@/stores/useAnswerStatusStore_modify