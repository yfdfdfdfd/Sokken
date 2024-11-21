<script setup lang="ts">
import router from './../router/index'
import Welcomepage from './WelcomePage.vue';


const props = defineProps<{
  list: string[]
  answer: string
  id: number
}>()




function selectOption(option: string) {
  if (option === props.answer) {
    alert('正解です！')
    router.push(`/quize/${props.id + 1}`)
    
  } else {
    alert('不正解です！')
  }
}
</script>

<template>
  <div class="question-container">
    <p>問題番号: {{ id + 1 }}</p>
    <ul>
      <li v-for="(option, index) in props.list" :key="index">
        <button @click="selectOption(option)">
          {{ option }}
        </button>
      </li>
    </ul>
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
