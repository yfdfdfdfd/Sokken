<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import CommunityIcon from './icons/IconCommunity.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>パスワードを忘れた</template>
    <template #default>
      <div>
        <label for="email">メールアドレス:</label>
        <input class="input-text"
          type="email"
          id="email"
          placeholder="メールアドレスを入力"
        />
      </div>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <div>
      <label for="send">ご登録されたメールアドレス宛に送信:</label>
    </div>
    <button
      style="
        margin-top: 20px;
        padding: 10px 20px;
        width: 100%;
        background-color: #34a3d1;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      "
    >
      パスワード再設定
    </button>
  </WelcomeItem>
</template>

<style scoped>

.input-text {
  padding: 8px;
  margin-top: 10px;
  width: 100%;
  border: 1px solid #ccc;
}

</style>
