<script setup lang="ts">
import HelloWorld from './SubTitle.vue'
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="../components/imgs/brain.png"
      width="30%"
      height="30%"
      style="max-width: 30%; max-height: 30%; width: 100%; height: auto"
    />

    <div class="wrapper">
      <HelloWorld msg="AI検定" />
      <!-- <HelloWorld msg="AI検定フィードバックシステム" /> -->
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  /* margin-right: 50px; */
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    /* margin: 0 2rem 0 0; */
    margin-right: 50px;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
