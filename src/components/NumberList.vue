<script lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useCountStore } from '@/stores/useCountStore'
import { useAnswerStatusStore } from '@/stores/useAnswerStatusStore'

const usecountstore = useCountStore()
const answerstatusstore = useAnswerStatusStore()
const { getStatus } = answerstatusstore

// ランダムに生成されたidを取得し配列に入れる

export default {
  setup() {
    const router = useRouter()
    const numbers = ref<number[]>(Array.from({ length: 30 }, (_, i) => i))

    function goToQuestion() {
      const nextQuestionId = getStatus(usecountstore.count)
      router.push(`/quize/${nextQuestionId.questionId}`)
    }

    return {
      numbers,
      goToQuestion
    }
  }
}
</script>

<template>
  <div class="number-list">
    <span v-for="id in numbers" :key="id" @click="goToQuestion()"> {{ id + 1 }} </span>
  </div>
</template>

<style scoped>
.number-list {
  margin-top: 20px;
  text-align: center;
  overflow-x: auto;
  white-space: nowrap;
  z-index: 1;
  position: relative;
}

.number-list span {
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 10px;
  color: var(--color-text);
  font-size: 15px;
  border: 0.1rem solid var(--color-border);
  display: inline-block;
}

/* Custom scrollbar styles */
.number-list::-webkit-scrollbar {
  height: 10px;
}

.number-list::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 5px;
}

.number-list::-webkit-scrollbar-track {
  background: var(--color-background);
  border-radius: 5px;
}
</style>
