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
          <h1>サイト説明</h1>

          <p class="about">
            このサイトは、AI検定に関するクイズを出題するWebサイトです。
            <br />
            AI検定に関する知識を問う問題を解いて、自分の理解度を確認することができます。
            <br /><br />
            学習者の理解度に応じて、適切なレベルの問題を自動生成します。
            <br />
            初心者から上級者までのニーズに対応できるよう、柔軟なアルゴリズムを採用しています。
            そして、過去の学習履歴を分析し、学習者個人に最適化された問題セットを提案します。
            苦手分野を集中的に学習できるよう、きめ細かいサポートを行います
          </p>
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
.about {
  font-size: 15px;
  margin-top: 20px;
}
</style>
