<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import AppHeader from '../components/AppHeader.vue'
</script>

<template>
  <div class="center">
    <div class="grid">
      <AppHeader />
      <main>
        <TheWelcome />
      </main>
    </div>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  place-items: center;
  height: 100vh;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 2rem;
}
</style>
