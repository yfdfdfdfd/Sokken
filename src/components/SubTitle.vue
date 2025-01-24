<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="summary">
    <!-- main.css に記述されたスタイル -->
    <h1 class="blue">{{ msg }}</h1>
    <h3 style="white-space: nowrap; text-align: center">AI検定の勉強を目的としたwebサイト</h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.summary h1,
.summary h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .summary h1,
  .summary h3 {
    text-align: center;
  }
}
</style>
