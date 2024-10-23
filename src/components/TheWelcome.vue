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
    <template #heading>ログイン</template>
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
    <template #heading></template>
    <template #default>
      <div>
        <label for="password">パスワード</label>
        <input
          type="password"
          id="password"
          placeholder="パスワードを入力"
          style="padding: 8px; margin-top: 10px; margin-bottom: 10px; width: 100%"
        />
        <div style="margin-top: 10px">
          <router-link to="/create" style="color: white; text-decoration: underline">
            アカウント新規作成
          </router-link>
        </div>
        <div style="margin-top: 10px">
          <a href="#" style="color: white; text-decoration: underline"> パスワードを忘れた </a>
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
          ログイン
        </button>
      </div>
    </template>
  </WelcomeItem>
</template>
