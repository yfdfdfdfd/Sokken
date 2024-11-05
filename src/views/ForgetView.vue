<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import PassForget from '@/components/PwforgotPage.vue'
</script>

<template>
  <div class="center">
    <div class="grid">
      <AppHeader />
      <main>
        <PassForget />
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
