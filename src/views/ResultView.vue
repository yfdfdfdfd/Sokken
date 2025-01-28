<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue'
import { useTimerStore } from '@/stores/useTimerStore'
import { useAnswerStatusStore } from '@/stores/useAnswerStatusStore'
import { useLoginStore } from '@/stores/useLoginStore'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const timerStore = useTimerStore()
const answerStatusStore = useAnswerStatusStore()
const { finishtime } = timerStore
const { getStatus } = answerStatusStore
const loginStore = useLoginStore()
const feedbackMessage = ref<string | undefined>(undefined)
const errorMessage = ref<string | undefined>(undefined)

// トークンが正しく設定されているか確認
console.log('Login Store:', loginStore)
console.log('Token:', loginStore.getToken)

const getToken = () => {
  const token = loginStore.getToken
  if (!token) {
    throw new Error('Token is undefined')
  }
  return token
}

onMounted(async () => {
  try {
    // ストアのステータス
    const status = answerStatusStore.getStatus()  // ここで取得

    const API_SERVER_URL = 'http://localhost:8000/generate-feedback';
    console.log('status:', status);

    // サーバーへのリクエスト
    const response = await axios.post(API_SERVER_URL, { status });
    console.log('Server response:', response.data);

    const feedbackResults = response.data;

    // レスポンスがオブジェクトの場合、配列に変換
    const feedbacks = Array.isArray(feedbackResults)
      ? feedbackResults
      : Object.values(feedbackResults);

    // 配列を結合してフィードバックメッセージを生成
    feedbackMessage.value = feedbacks.join('\n');
    console.log('Feedback message:', feedbackMessage.value);
  } catch (error) {
    console.error('Unexpected error:', error);
    errorMessage.value = 'フィードバックの生成に失敗しました。';
  }
});
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

      <!-- <div class="result">
        <div v-for="(status, index) in getStatus()" :key="index">
          <div class="result-count">{{ index + 1 }}</div>
          <div class="result-item">
            {{ status.isCorrect != undefined ? (status.isCorrect == true ? '◯' : '✕') : '未回答' }}
          </div>
        </div>
      </div> -->

      <!-- ここで answerStatusStore.getStatus() を直接使う -->
      <div class="result">
        <div v-for="(item, index) in answerStatusStore.getStatus()" :key="index">
          <div class="result-count">{{ index + 1 }}</div>
          <div class="result-item">
            {{ item.isCorrect !== undefined ? (item.isCorrect ? '◯' : '✕') : '未回答' }}
          </div>
        </div>
      </div>


      <div v-if="feedbackMessage" class="feedback-message">{{ feedbackMessage }}</div>
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

.feedback-message {
  color: #34a3d1;
  margin-top: 20px;
  white-space: pre-wrap;
}

.result-count {
  text-align: center;
}

.result-item {
  text-align: center;
}

.result {
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center; /* 横方向中央寄せ */
  align-items: center;    /* 縦方向中央寄せ */
}
</style>
@/stores/useAnswerStatusStore_modify