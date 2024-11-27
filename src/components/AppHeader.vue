<script setup lang="ts">
import { ref, computed } from 'vue'; // ref と computed をインポート
import HelloWorld from './SubTitle.vue'; // SubTitle.vue のコンポーネントをインポート

// ログイン状態を管理
const isLoggedIn = ref<boolean>(false); // サーバーからの状態に変更可能

// ヘッダーメッセージを計算
const headerMessage = computed(() => 
  isLoggedIn.value ? 'ようこそ！' : 'AI検定'
);
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="AI検定" />
    </div>
    <!-- ヘッダーメッセージを表示 -->
    <h1>{{ headerMessage }}</h1>
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
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
