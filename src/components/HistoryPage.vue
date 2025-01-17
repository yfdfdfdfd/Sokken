<!-- ユーザーが解いた問題の履歴を表示するページ -->

<script setup lang="ts">
import { DefaultApi, Configuration, type UserAnswerResponseChild } from '../generated'
import { ref, onMounted } from 'vue'
import { useLoginStore } from '@/stores/useLoginStore'
import router from '../router/router'

const child = ref<UserAnswerResponseChild[] | undefined>(undefined)
const errorMessage = ref<string | undefined>(undefined)
const getToken = useLoginStore().getToken

// 共通のquizeListUuidを持つ問題を表示する履歴に遷移する関数

function viewDetails(item: UserAnswerResponseChild) {
  router.push(`/history/${item.quizeListUuid}`)
  console.log('Viewing details for:', item)
}

async function fetchQuestionHistory() {
  try {
    const config = new Configuration({
      basePath: 'http://localhost:8000'
    })
    const response = await new DefaultApi(config).readUserAnswerUserHistoryUuidGet({
      token: getToken
    })
    child.value = response.child

    console.log('Question history:', response)
  } catch (error) {
    console.error('Error fetching question history:', error)
    errorMessage.value = '履歴データの取得に失敗しました'
  }
}

onMounted(() => {
  fetchQuestionHistory()
})
</script>

<template>
  <div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-else>
      <v-table class="v-table" v-if="child && child.length > 0">
        <thead>
          <tr>
            <th style="text-align: center; border: 1px solid var(--color-border); font-size: large">
              問題集番号
            </th>
            <th style="text-align: center; border: 1px solid var(--color-border); font-size: large">
              回答日時
            </th>
            <th style="text-align: center; border: 1px solid var(--color-border); font-size: large">
              詳細
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in child" :key="index">
            <td>{{ item.quizeListUuid }}</td>
            <td>{{ new Date(item.answeredAt).toLocaleString() }}</td>
            <td>
              <v-btn @click="viewDetails(item)">詳細を見る</v-btn>
            </td>
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
