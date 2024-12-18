<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import NavHeader from '@/components/NavHeader.vue'
</script>

<template>
  <NavHeader />
  <div class="center">
    <div class="grid">
      <AppHeader />
      <main style="background: var(--color-background); padding: 30px;">
        <div class="title">
            <h2 style="margin-bottom: 20px; font-weight: bold;">目次</h2>
          <section>
        <h3 class="hover-underline">Home</h3>
        <h4>
          Homeページでは、本番を想定して問題を解くことができ、制限時間の設定ができます。
          解答開始ボタンを押すことで始まります。
        </h4>
          </section>
          <br />
          <section>
        <h3 class="hover-underline">About</h3>
        <h4>Aboutページでは、このサイトの説明を見ることができます。</h4>
          </section>
          <br />
          <section>
        <h3 class="hover-underline">Practice</h3>
        <h4>Practiceページではインプット向けの勉強を行うことができます。</h4>
          </section>
          <br />
          <section>
        <h3 class="hover-underline">History</h3>
        <h4>Historyページでは、過去に解いた問題を閲覧できます。</h4>
        </section>
          <br />
        </div>
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

.hover-underline:hover {
  cursor: pointer;
}

h3 {
    display: block;
    font-weight: 500;
    
}
</style>
