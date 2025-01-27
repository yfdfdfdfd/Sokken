<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue'
import HistoryPage from '../components/HistoryOutline.vue'
</script>

<template>
  <NavHeader />
  <main>
    <div>
      <HistoryPage />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  margin: 120px;
}

main > * {
  flex: 1;
  /* display: flex; */
  justify-content: center;
  align-items: center;
}
</style>
