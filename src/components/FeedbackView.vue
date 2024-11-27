<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const feedbackMessage = ref<string>('フィードバックを取得中...')
const userId = ref<number | null>(null)

async function fetchFeedback() {
  try {
    const response = await axios.post('http://localhost:8000/feedback', {
      userId: userId.value ?? 0,
    })
    feedbackMessage.value = response.data.feedback ?? 'フィードバックがありません'
  } catch (error) {
    console.error('フィードバック取得中にエラーが発生しました:', error)
    feedbackMessage.value = 'エラーが発生しました。'
  }
}

fetchFeedback()
</script>

<template>
  <div>
    <h2>フィードバック</h2>
    <p>{{ feedbackMessage }}</p>
  </div>
</template>

<style scoped>
h2 {
  color: #4caf50;
}
</style>
