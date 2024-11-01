<script setup lang="ts">
import QuizProblem from '@/components/QuizeProblem.vue'
import ProblemList from '@/components/ProblemList.vue';
import NavHeader from '@/components/NavHeader.vue';
</script>

<template>
  <NavHeader />
  <QuizProblem />
  <main>
    <ProblemList />
  </main>
</template>
