<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue'
import { useTimerStore } from '@/stores/useTimerStore'
import { useAnswerStatusStore } from '@/stores/useAnswerStatusStore'
import { useLoginStore } from '@/stores/useLoginStore'
import { Configuration, DefaultApi } from '@/generated'
import { onMounted, ref } from 'vue'

const timerStore = useTimerStore()
const answerStatusStore = useAnswerStatusStore()
const { finishtime } = timerStore
const { getStatusAll } = answerStatusStore
const getToken = useLoginStore().getToken
const errorMessage = ref<string | undefined>(undefined)

async function postuserAnswer() {
  try {
    const config = new Configuration({
      basePath: 'http://localhost:8000'
    })
    const response = await new DefaultApi(config).postResultResultsPost({
      userAnswerCreate: {
        token: getToken,
        child: getStatusAll()
      }
    })
    console.log('User created:', response)
    errorMessage.value = ''
  } catch (error) {
    console.error('Error creating user:', error)
    errorMessage.value = '結果の送信に失敗しました。'
  }
}
onMounted(() => {
  postuserAnswer()
})
</script>

<template>
  <NavHeader />
  <main>
    <div>
      <h1>結果</h1>
      <p>
        お疲れ様でした！<span v-if="finishtime">あなたの回答時間は{{ finishtime }}秒です。</span>
        <span v-else>タイマーは設定されていません。</span>
      </p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <div class="result">
        <div v-for="(status, index) in getStatusAll()" :key="index">
          <div class="result-count">{{ index + 1 }}</div>
          <div class="result-item">
            {{ status.isCorrect != undefined ? (status.isCorrect == true ? '◯' : '✕') : '未回答' }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  top: 50%;
}
p {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  top: 50%;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.button {
  background-color: #34a3d1;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.button:hover {
  background-color: auto;
}

.button:active {
  background-color: auto;
}

.result {
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
}

.result > div {
  display: flex;
  flex-direction: column;
}

.result > div > div {
  border: 1px solid #ccc;
  width: 100px;
  padding: 0px 10px;
}

.error-message {
  color: #f6aa00;
  margin-top: 5px;
}

.result-count {
  text-align: center;
}

.result-item {
  text-align: center;
}
</style>
