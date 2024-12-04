import { ref,} from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const correct = ref(0)
  const wrong = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  function increment() {
    correct .value++
  }
  function decrement() {
    wrong.value++
  }
  return { correct , increment, wrong, decrement }
})

