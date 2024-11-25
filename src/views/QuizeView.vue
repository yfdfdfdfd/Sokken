<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue'
import { DefaultApi, Configuration } from '../generated'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import QuestionOption from '@/components/QuestionOption.vue'
import QuestionList from '@/components/QuestionList.vue'
import { useTimerStore } from '@/stores/timer'

const timerstore = useTimerStore()
const { getDiff } = timerstore

const route = useRoute()
const question = ref<string | undefined>(undefined)
const list = ref<string[]>([])
const errorMessage = ref<string | undefined>(undefined)
const answer = ref<string | undefined>(undefined)
const diff = ref<number>(0)
const intervalId = ref<number | undefined>(undefined)

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

    console.log('Question data:', response)
  } catch (error) {
    console.error('Error fetching question data:', error)
    errorMessage.value = '問題データの取得に失敗しました'
  }
}
onMounted(() => {
  fetchQuestionData()
  intervalId.value = setInterval(() => {
    diff.value = getDiff()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})

//idが変更された場合のみ
watch(
  () => route.params.id,
  () => {
    fetchQuestionData()
  }
)

watch(
  () => diff.value < 0,
  () => {
      alert('時間切れです')
    }
)
</script>

<template>
  <NavHeader />
  <main>
    <div>
      <QuestionList v-if="question" :question="question" />
    </div>
    <div>
      <QuestionOption
        v-if="answer"
        :answer="answer"
        :list="list"
        :id="Number($route.params.id)"
        :timer="Math.max(0, diff)"
      />
    </div>
    <p v-if="errorMessage" style="color: #f6aa00; margin-top: 5px">{{ errorMessage }}</p>
  </main>
</template>

<style scoped>
main {
  display: flex;
}

main > * {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
