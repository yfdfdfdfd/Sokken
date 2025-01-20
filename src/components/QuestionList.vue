<script setup lang="ts">
const props = defineProps<{
  question: string
}>()
</script>

<template>
  <div class="question-container">
    <h2>問題</h2>
    <h3>{{ props.question }}</h3>
  </div>
</template>

<style scoped>
.question-container {
  font-size: 15px;
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
  margin-left: 50px;
}

h3 {
  margin-left: 50px;
}
</style>
