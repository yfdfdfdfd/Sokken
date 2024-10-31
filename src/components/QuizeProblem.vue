<script setup lang="ts">
import { ref } from 'vue'

const options = ref([
  'ア',
  'イ',
  'ウ',
  'エ'
])
const selectedOption = ref<number | null>(null)

function selectOption(index: number) {
  selectedOption.value = index
  alert(`You selected: ${options.value[index]}`)
}
</script>

<template>
  <div class="question-container">
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
  margin-top: 100px;
  margin-left: 40px;
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
  padding: 30px 40px;
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
