<script lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  setup() {
    const router = useRouter()
    const breadcrumbs = ref<number[]>(Array.from({ length: 30 }, (_, i) => i))

    function goToQuestion(id: number) {
      router.push(`/quize/${id}`)
    }

    return {
      breadcrumbs,
      goToQuestion
    }
  }
}
</script>

<template>
  <div class="breadcrumbs">
    <span v-for="id in breadcrumbs" :key="id" @click="goToQuestion(id)"> {{ id + 1 }} </span>
  </div>
</template>

<style scoped>
.breadcrumbs {
  margin-top: 20px;
  text-align: center;
  overflow-x: auto;
  white-space: nowrap;
  z-index: 1; /* Ensure the breadcrumbs are on top */
  position: relative; /* Required for z-index to work */
}

.breadcrumbs span {
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 10px;
  color: var(--color-text);
  font-size: 15px;
  border: 0.1rem solid var(--color-border);
  display: inline-block;
}

/* Custom scrollbar styles */
.breadcrumbs::-webkit-scrollbar {
  height: 10px;
}

.breadcrumbs::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 5px;
}

.breadcrumbs::-webkit-scrollbar-track {
  background: var(--color-background);
  border-radius: 5px;
}
</style>
