<script setup lang="ts">
import { ref } from 'vue'
import { DefaultApi, Configuration } from '../generated'

const analysisResult = ref<string>('解析中...')
const userId = ref<number | null>(null)

async function fetchAnalysis() {
  const config = new Configuration({
    basePath: 'http://localhost:8000',
  })
  try {
    const api = new DefaultApi(config)
    const response = await api.analyzeUserHistoryAnalysisPost({
      userId: userId.value ?? 0,
    })
    analysisResult.value = response.result ?? '解析結果がありません'
  } catch (error) {
    console.error('解析中にエラーが発生しました:', error)
    analysisResult.value = 'エラーが発生しました。'
  }
}

fetchAnalysis()
</script>

<template>
  <div>
    <h2>解答解析結果</h2>
    <p>{{ analysisResult }}</p>
  </div>
</template>

<style scoped>
h2 {
  color: #333;
}
</style>
