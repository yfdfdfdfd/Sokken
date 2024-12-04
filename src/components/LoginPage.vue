<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import { DefaultApi, Configuration } from '../generated'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import router from './../router/index'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function loginUser() {
  console.log('login function called') // デバッグログ

  if (password.value === '' || email.value === '') {
    errorMessage.value = 'メールアドレスとパスワードを入力してください'
    return
  }

  try {
    const config = new Configuration({
      basePath: 'http://localhost:8000'
    })
    const response = await new DefaultApi(config).loginUserLoginPost({
      userLogin: {
        email: email.value,
        password: password.value
      }
    })
    console.log('User Logged in:', response) // デバッグログ
    errorMessage.value = ''

    router.replace('/welcome')
  } catch (error) {
    console.error('Error logging in:', error) // デバッグログ
    errorMessage.value = 'ログインに失敗しました'
  }
}
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
          style="padding: 8px; margin-top: 10px; width: 100%; border: white;background-color: white;"
          v-model="email"
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
          v-model="password"
          style="padding: 8px; margin-top: 10px; margin-bottom: 10px; width: 100%; background-color: white;"
        />
        <div style="margin-top: 10px">
          <router-link to="/create" style="color: auto; text-decoration: underline">
            アカウント新規作成
          </router-link>
        </div>
        <div style="margin-top: 10px">
          <router-link to="/forget" style="color: auto; text-decoration: underline">
            パスワードを忘れた
          </router-link>
        </div>
        <button
          @click="loginUser"
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
        <p v-if="errorMessage" style="color: #f6aa00; margin-top: 5px">{{ errorMessage }}</p>
      </div>
    </template>
  </WelcomeItem>
</template>
