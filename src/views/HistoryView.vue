<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue'
import HistoryPage from '@/components/HistoryPage.vue'
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
  margin-top: 70px;
}

main > * {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
