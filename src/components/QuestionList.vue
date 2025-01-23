<script setup lang="ts">
const props = defineProps<{
  question: string
  timer: number
}>()
</script>

<template>
  <div class="question-container">
    <p class="timer">残り時間: {{ props.timer }}秒</p>
    <h2>問題</h2>
    <h3 class="question">{{ props.question }}</h3>
  </div>
</template>

<style scoped>
.question {
  margin-bottom: 40px;
  font-size: 20px;
}

.question-container {
  font-size: 15px;
}

.timer {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: right;
  border-radius: 10px;
  font-size: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

h2 {
  margin-top: 20px;
  margin-left: 30px;
}

h3 {
  margin-left: 30px;
}
</style>
