<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import NavHeader from '@/components/NavHeader.vue'
</script>

<template>
  <NavHeader />
  <div class="center">
    <div class="grid">
      <AppHeader />
      <main>
        <div class="title">
          <h2 style="margin-top: 70px; margin-bottom: 20px;">サイト説明</h2>

          <section>

            <h3>Home</h3>
            <h4>
              Homeページでは、問題の出題数の変更、時間設定ができます。
              <br>
              出題開始ボタンを押すことで始まります。
            </h4>
=======
            <h2>Home</h2>
            <h3>
              Homeページでは、問題の出題数の変更、時間設定ができます。
              出題開始ボタンを押すことで始まります。
            </h3>

          </section>
          <br>

          <section>

            <h3>About</h3>
            <h4>
              Aboutページでは、このサイトの説明を見ることができます。
            </h4>
=======
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

            <h3>Feedback</h3>
            <h4>
              Feedbackページでは、問題のジャンル、問題文、選択肢、正解を入力して問題を作成できます。
            </h4>
          </section>
          <br>
          <section>
            <h3>History</h3>
            <h4>
              Historyページでは、過去に解いた問題を閲覧できます。
            </h4>
=======
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