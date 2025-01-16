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
      <v-table class="v-table" v-if="child && child.length > 0">
        <thead>
          <tr>
            <th style="text-align: center; border: 1px solid black">問題</th>
            <th style="text-align: center; border: 1px solid black">解説</th>
            <th style="text-align: center; border: 1px solid black">正解</th>
            <th style="text-align: center; border: 1px solid black">タグ</th>
            <th style="text-align: center; border: 1px solid black">正誤</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in child" :key="index">
            <td>{{ item.questionText }}</td>
            <td>{{ item.commentary }}</td>
            <td>{{ item.correctAnswer }}</td>
            <td style="writing-mode: vertical-rl; text-align: center">{{ item.tag }}</td>
            <td>{{ item.isCorrect ? '◯' : '✕' }}</td>
          </tr>
        </tbody>
      </v-table>
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

.v-table {
  background-color: var(--color-background);
  color: var(--color-text);
}
</style>
