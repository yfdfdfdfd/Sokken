<!-- ユーザーが解いた問題の履歴を表示するページ -->

<script setup lang="ts">
import { DefaultApi, Configuration, type UserAnswerResponseChild } from '../generated'
import { ref, onMounted } from 'vue'
import { useLoginStore } from '@/stores/useLoginStore'
import router from '../router'

const child = ref<UserAnswerResponseChild[] | undefined>(undefined)
const errorMessage = ref<string | undefined>(undefined)
const getToken = useLoginStore().getToken || ''

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
    child.value = response.child.reverse()

    console.log('Question history:', response)
  } catch (error) {
    console.error('Error fetching question history:', error)
    errorMessage.value = '履歴データの取得に失敗しました'
  }
}

// // async function deleteDetails(item: UserAnswerResponseChild) {
// //   try {
// //     const config = new Configuration({
// //       basePath: 'http://localhost:8000'
// //     })
// //     const response = await new DefaultApi(config).deleteUserAnswerUserHistoryUuidDelete({
// //       token: getToken,
// //       quizeListUuid: item.quizeListUuid
// //     })
// //     console.log('Deleted details:', response)
// //     fetchQuestionHistory()
// //   } catch (error) {
// //     console.error('Error deleting details:', error)
// //     errorMessage.value = '履歴データの削除に失敗しました'
// //   }
// }

onMounted(() => {
  fetchQuestionHistory()
})
</script>

<template>
  <div>
    <h1 style="width: 100%">履歴</h1>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-else>
      <v-table class="v-table" v-if="child && child.length > 0">
        <thead>
          <tr>
            <th style="text-align: center; border: 1px solid var(--color-border); font-size: large">
              回答日時
            </th>
            <th style="text-align: center; border: 1px solid var(--color-border); font-size: large">
              問題詳細
            </th>
            <th style="text-align: center; border: 1px solid var(--color-border); font-size: large">
              削除
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in child" :key="index">
            <td style="text-align: center; border: 1px solid var(--color-border); font-size: large">
              {{ new Date(item.answeredAt).toLocaleString() }}
            </td>
            <td style="text-align: center; border: 1px solid var(--color-border); font-size: large">
              <v-btn color="primary" @click="viewDetails(item)">詳細を見る</v-btn>
            </td>
            <td style="text-align: center; border: 1px solid var(--color-border); font-size: large">
              <!-- <button icon @click="deleteDetails(item)">
                <img
                  src="../components/imgs/box.png"
                  alt="削除"
                  style="
                  background-color: aliceblue;
                  width: 40px;
                  height: 40px;
                  margin-top: 10px;
                  border-radius: 50%;
                  "
                />
                </button> -->
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
