<script setup lang="ts">
import { ref } from 'vue'

const question = ref('What is the capital of France?')
const options = ref(['Berlin', 'Madrid', 'Paris', 'Rome'])
const selectedOption = ref<number | null>(null)

function selectOption(index: number) {
  selectedOption.value = index
  alert(`You selected: ${options.value[index]}`)
}
</script>

<template>
  <div class="question-container">
    <h1>問題</h1>
    <h1>{{ question }}</h1>
    <ul>
      <li v-for="(option, index) in options" :key="index">
        <button @click="selectOption(index)" :class="{ selected: selectedOption === index }">
          {{ option }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.question-container {
  text-align: center;
  margin-top: 20px;
  font-size: 24px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

button {
  padding: 10px 50px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
}

button.selected {
  background-color: #4caf50;
  color: white;
}
</style>
