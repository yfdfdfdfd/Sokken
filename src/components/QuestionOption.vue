<script setup lang="ts">
import { defineProps, reactive } from 'vue'
import { useAnswerStatusStore } from '@/stores/useAnswerStatusStore'
import { useCountStore } from '@/stores/useCountStore'

const selectedOptions = reactive<{ [key: number]: string | undefined }>({})
const answerStatusStore = useAnswerStatusStore()
const userCountStore = useCountStore()
const { setStatus } = answerStatusStore
const { increment } = userCountStore

// 初期化

const props = defineProps<{
  list: string[]
  answer: string
  id: number
}>()

// 選択肢を選択する関数
function selectOption(option: string) {
  selectedOptions[props.id] = option
  if (option === props.answer) {
    setStatus(props.id, true)
  } else {
    setStatus(props.id, false)
  }
}

// 次の問題に進む関数
function nextQuestion() {
  increment()
}
</script>

<template>
  <div class="question-container">
    <ul>
      <li v-for="(option, index) in props.list" :key="index">
        <label>
          <input
            type="radio"
            :value="option"
            name="question"
            @click="selectOption(option)"
            :checked="option === selectedOptions[props.id]"
          />
          {{ option }}
        </label>
      </li>
    </ul>
    <button @click="nextQuestion">次の問題へ</button>
  </div>
</template>

<style scoped>
.question-container {
  font-size: 20px;
  max-height: 420px;
  max-width: 950px;
  margin-right: 10px;
}

ul {
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin-left: 30px;
}

li {
  width: 100%;
  margin: 10px 0;
  font-size: 20px;
}

/* 次の問題に進むボタン */
button {
  padding: 20px 5px;
  font-size: 16px;
  cursor: pointer;
  width: 25%;
  box-sizing: border-box;
  display: block;
  margin: 50px auto;
  margin-left: 1045px;
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
