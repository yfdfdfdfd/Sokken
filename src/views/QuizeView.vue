<script setup lang="ts">
import QuizProblem from '@/components/QuizeProblem.vue'
import ProblemList from '@/components/ProblemList.vue'
import NavHeader from '@/components/NavHeader.vue'
</script>

<template>
  <NavHeader />
  <main>
    <div>
      <ProblemList />
    </div>
    <div>
      <QuizProblem />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
}

main > * {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
