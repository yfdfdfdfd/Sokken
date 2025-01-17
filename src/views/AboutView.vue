<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import NavHeader from '@/components/NavHeader.vue'
</script>

<template>
  <NavHeader />
  <div class="center">
    <div class="grid">
      <AppHeader />
      <main class="right">
        <div class="title">
          <h2>目次</h2>
          <section>
            <h3 class="hover-underline">Home</h3>
            <h4>
              Homeページでは、本番を想定して問題を解くことができ、制限時間を5分～50分の間で設定ができます。
              解答開始ボタンを押すことで始まります。
            </h4>
          </section>
          <br />
          <section>
            <h3 class="hover-underline">About</h3>
            <h4>--現在閲覧中のページ--</h4>
          </section>
          <br />
          <section>
            <h3 class="hover-underline">Practice</h3>
            <h4>Practiceページではインプット向けの勉強を行うことができます。</h4>
            <h4>知識が全くない方はこちらからおすすめします</h4>
          </section>
          <br />
          <section>
            <h3 class="hover-underline">History</h3>
            <h4>Historyページでは、過去に解いた問題を閲覧できます。</h4>
          </section>
          <br />
          <section>
            <h3 class="hover-underline">Logout</h3>
            <h4>ログイン画面に戻ります。</h4>
            <h4>セッションがなくなりますので再度ログインが必要になります</h4>
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
  text-decoration: underline;
}

h2 {
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}

h3 {
  display: block;
  font-weight: 500;
}

.right {
  background: var(--color-background-soft);
  padding: 30px;
  font-size: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  margin-top: 50px;
}
</style>
