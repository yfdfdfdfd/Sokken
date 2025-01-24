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
import { useCountStore } from '@/stores/useCountStore'
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
const usecountstore = useCountStore()
const { getDiff } = timerstore
const { getStatus } = answerstatusstore

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
  } catch (error) {
    console.error('Error fetching question data:', error)
    errorMessage.value = '問題データの取得に失敗しました'
  }
}

onMounted(() => {
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
  usecountstore.reset()
})

watch(
  () => usecountstore.count,
  () => {
    if (usecountstore.count === 30) {
      Dialog2.value = true
      timerstore.setFinishTime(timerstore.getPastTime)
    } else {
      const nextQuestionId = getStatus(usecountstore.count)
      router.replace(`/quize/${nextQuestionId.questionId}`)
    }
  }
)

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
      // 終わった時間を保存
      timerstore.setFinishTime(timerstore.getPastTime)
    }
  }
)

// ダイアログが閉じられたら結果画面に遷移

watch(
  () => Dialog.value,
  (isDialogClosed) => {
    if (!isDialogClosed) {
      getStatus
      router.replace('/result')
    }
  }
)

watch(
  () => Dialog2.value,
  (isDialogClosed) => {
    if (!isDialogClosed) {
      getStatus
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
      <QuestionList v-if="question" :question="question" :timer="Math.max(0, diff)" />
      <QuestionOption v-if="answer" :answer="answer" :list="list" :id="Number(route.params.id)" />
    </div>
    <p v-if="errorMessage" style="color: #f6aa00; margin-top: 5px">{{ errorMessage }}</p>

    <v-dialog v-model="Dialog" width="auto">
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

    <v-dialog v-model="Dialog2" width="auto">
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
