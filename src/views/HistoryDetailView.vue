<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue'
import HistoryDetailPage from '@/components/HistoryDetail.vue'
</script>

<template>
  <NavHeader />
  <main>
    <div>
      <HistoryDetailPage />
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
