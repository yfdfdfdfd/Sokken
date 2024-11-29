<script setup lang="ts">
import router from './../router/index'
import { defineProps, ref } from 'vue'

const Message = ref<string | undefined>(undefined)
const Dialog = ref<boolean>(false)
const Select = ref<string | undefined>(undefined)

const props = defineProps<{
  list: string[]
  answer: string
  id: number
  timer: number
}>()

//正誤判定がオンの場合正誤判定を行う(予定)
function selectOption(option: string) {
  if (option === props.answer) {
    Message.value = '正解です！'
    Select.value = option
    Dialog.value = true
    setTimeout(() => {
      Dialog.value = false
    }, 800)
    setTimeout(() => {
      router.push(`/quize/${props.id + 1}`)
    }, 1600)
  } else {
    Message.value = '不正解です！'
    Select.value = option
    Dialog.value = true
    setTimeout(() => {
      Dialog.value = false
    }, 1600)
  }
}
</script>

<template>
  <div class="question-container">
    <p style="margin-bottom: 10px; text-align: right; border-radius: 10px">
      残り時間: {{ props.timer }}秒
    </p>
    <p>問題番号: {{ props.id + 1 }}</p>
    <ul>
      <li v-for="(option, index) in props.list" :key="index">
        <button @click="selectOption(option)">
          {{ option }}
        </button>
      </li>
    </ul>
  </div>

  <v-dialog v-model="Dialog" width="auto">
    <v-card max-width="400" prepend-icon="mdi-update" :text="Select" :title="Message">
      <template v-slot:actions>
        <v-btn class="ms-auto" text="Ok" @click="Dialog = false"></v-btn>
      </template>
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

button {
  padding: 15px 10px;
  font-size: 16px;
  cursor: pointer;
  width: 90%;
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
  background-color: auto;
}

button.selected {
  background-color: #4caf50;
  color: white;
}
</style>
