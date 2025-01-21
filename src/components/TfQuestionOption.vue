<script setup lang="ts">
import router from '../router'
import { defineProps, ref, watch } from 'vue'

const Dialog = ref<boolean>(false)
const Message = ref<string>('')
const Select = ref<string | undefined>('')

const props = defineProps<{
  list: string[]
  answer: string
  Commentary: string
  id: number
}>()

function selectOption(option: string) {
  Select.value = option
  if (option === props.answer) {
    Message.value = '正解です！'
  } else {
    Message.value = '不正解です！'
  }
  Dialog.value = true
}

// ダイアログを閉じた際に遷移
watch(Dialog, (isDialogOpen) => {
  if (!isDialogOpen && Message.value === '正解です！') {
    router.push(`/quizepractice/${props.id + 1}`)
  }
})
</script>

<template>
  <div class="question-container">
    <p>問題番号: {{ props.id + 1 }}</p>
    <ul>
      <li v-for="(option, index) in props.list" :key="index">
        <button class="option-button" @click="selectOption(option)">
          {{ option }}
        </button>
      </li>
    </ul>
  </div>

  <v-dialog v-model="Dialog" width="auto" max-height="500">
    <v-card max-width="600">
      <v-card-title class="centered-title">
        {{ Message }}
      </v-card-title>
      <v-card-text style="text-align: center; font-size: 20px">
        {{ Select }}
      </v-card-text>
      <v-card-text v-if="Message === '正解です！'">
        {{ props.Commentary }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="dialog-button" @click="Dialog = false">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
}

li {
  width: 100%;
  margin: 10px 0;
}

.option-button {
  padding: 15px 10px;
  font-size: 16px;
  cursor: pointer;
  width: 90%;
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
  background-color: auto;
}

.option-button:hover {
  background: var(--color-background-soft);
  color: auto;
}

.dialog-button {
  background-color: var(--color-primary);
  color: black;
  text-align: center;
}

.dialog-button:hover {
  background-color: var(--color-primary-dark);
}

.centered-title {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.5rem;
  font-weight: lighter;
}
</style>
