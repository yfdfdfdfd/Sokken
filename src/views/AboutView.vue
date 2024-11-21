<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="center">
    <div class="grid">
      <AppHeader />
      <main>
        <div class="about">
          <h1>サイト説明</h1>

          <section>
            <h2>Home</h2>
            <h3>
              Homeページでは、問題の出題数の変更、時間設定ができます。
              出題開始ボタンを押すことで始まります。
            </h3>
          </section>
          <br>

          <section>
            <h2>About</h2>
            <h3>
              Aboutページでは、このサイトの説明を見ることができます。
            </h3>
          </section> 
          <br>

          <section>
            <h2>Generate</h2>
            <h3>
              Generateページでは、問題のジャンル、問題文、選択肢、正解を入力して問題を作成できます。
            </h3>
          </section>
          <br>

          <section>
            <h2>Quize</h2>
            <h3>
              Quizeページでは、問題を解くことができます。
            </h3>
          </section>
          <br>

          <section>
            <h2>History</h2>
            <h3>
              Historyページでは、過去に解いた問題を閲覧できます。
            </h3>
          </section>
          <br>
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
</style>
