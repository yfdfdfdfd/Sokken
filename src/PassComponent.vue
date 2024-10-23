<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import QuizProblem from '@/components/QuizProblem.vue'
</script>

<template>
  <header>
    <div>
      <QuizProblem />
      <!-- ここでコンポーネントを呼び出す -->
    </div>
  </header>

  <RouterView />
</template>
