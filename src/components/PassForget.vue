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
        <input
          type="email"
          id="email"
          placeholder="メールアドレスを入力"
          style="padding: 8px; margin-top: 10px; width: 100%"
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
        background-color: #4caf50;
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
