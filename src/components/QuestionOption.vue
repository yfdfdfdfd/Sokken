<script setup lang="ts">
import router from './../router/index'
import { defineProps, ref } from 'vue'
import { useAnswerStatusStore } from '@/stores/useAnswerStatusStore'

const selectedOption = ref<string | undefined>('')
const answerStatusStore = useAnswerStatusStore()
const { setStatus } = answerStatusStore

// 初期化

const props = defineProps<{
  list: string[]
  answer: string
  id: number
  timer: number
}>()

// 選択肢を選択する関数
function selectOption(option: string) {
  selectedOption.value = option
  if (option === props.answer) {
    setStatus(props.id, true)
  } else {
    setStatus(props.id, false)
  }
}

// 次の問題に進む関数
function nextQuestion() {
  if (selectedOption.value !== undefined) {
    router.push(`/quize/${props.id + 1}`)
  }
}
</script>

<template>
  <div class="question-container">
    <p style="margin-bottom: 10px; text-align: right; border-radius: 10px">
      残り時間: {{ props.timer }}秒
    </p>
    <p style="margin-left: 50px">問題番号: {{ props.id + 1 }}</p>
    <ul>
      <li v-for="(option, index) in props.list" :key="index">
        <label>
          <input
            type="radio"
            :value="option"
            name="question"
            @click="selectOption(option)"
            :checked="option === selectedOption"
          />
          {{ option }}
        </label>
      </li>
    </ul>
    <button @click="nextQuestion" :disabled="!selectedOption">次の問題へ</button>
  </div>
</template>

<style scoped>
.question-container {
  font-size: 24px;
  width: 100%;
}

ul {
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin-left: 50px;
}

li {
  width: 100%;
  margin: 10px 0;
  font-size: 20px;
}

button {
  padding: 15px 10px;
  font-size: 16px;
  cursor: pointer;
  width: 25%;
  box-sizing: border-box;
  display: block;
  margin: 25px auto;
  margin-right: 50px;
  background-color: auto;
  border: 1px solid #ccc;
}

button:hover {
  background: var(--color-background-soft);
}

button:disabled {
  background-color: auto;
}

.centered-title {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
