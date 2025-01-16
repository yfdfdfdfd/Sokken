<script setup lang="ts">
import { DefaultApi, Configuration, type UserAnswerDetailResponseChild } from '../generated'
import { ref, onMounted } from 'vue'
import { useLoginStore } from '@/stores/loginStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const child = ref<UserAnswerDetailResponseChild[] | undefined>(undefined)
const errorMessage = ref<string | undefined>(undefined)
const getToken = useLoginStore().getToken

async function fetchQuestionDetailHistory() {
  try {
    const config = new Configuration({
      basePath: 'http://localhost:8000'
    })
    const response = await new DefaultApi(config).readUserAnswerUserHistoryByUuidGet({
      token: getToken,
      quizeListUuid: route.params.quizeListUuid as string
    })
    child.value = response.child
    console.log('Question Detailhistory:', response)
  } catch (error) {
    console.error('Error fetching question history:', error)
    errorMessage.value = '履歴データの取得に失敗しました'
  }
}

onMounted(() => {
  fetchQuestionDetailHistory()
})
</script>

<template>
  <div>
    <h1 style="width: 100%">問題履歴</h1>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-else>
      <div v-if="child && child.length > 0">
        <div
          v-for="(item, index) in child"
          :key="index"
          style="border: 1px solid var(--color-border); margin-bottom: 10px; padding: 10px"
        >
          <p class="detail-item"><strong>問題:</strong> {{ item.questionText }}</p>
          <p class="detail-item"><strong>解説:</strong> {{ item.commentary }}</p>
          <p class="detail-item"><strong>選択肢:</strong> {{ item.choices }}</p>
          <p class="detail-item"><strong>正解:</strong> {{ item.correctAnswer }}</p>
          <p class="detail-item"><strong>タグ:</strong>{{ item.tag }}</p>
          <p class="detail-item"><strong>あなたの正誤:</strong> {{ item.isCorrect ? '◯' : '✕' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
main {
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.detail-item {
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
  font-size: 1rem;
}
</style>
