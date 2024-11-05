<script setup lang="ts">
import { ref } from 'vue'

const options = ref(['ア', 'イ', 'ウ', 'エ'])
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
