<script setup lang="ts">
import { ref } from 'vue'
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import { DefaultApi, Configuration } from './../generated'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

async function createUser() {
  console.log('createUser function called') // デバッグログ

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'パスワードが一致しません'
    return
  }

  try {
    const config = new Configuration({
      basePath: 'http://localhost:8000'
    })
    const response = await new DefaultApi(config).createUserUsersPost({
      userCreate: {
        name: name.value,
        password: password.value,
        email: email.value
      }
    })
    console.log('User created:', response) // デバッグログ
    errorMessage.value = ''
  } catch (error) {
    console.error('Error creating user:', error) // デバッグログ
    errorMessage.value = 'アカウント作成に失敗しました'
  }
}
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>アカウント作成</template>
    <template #default>
      <div>
        <label for="name">名前:</label>
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="名前を入力"
          style="padding: 8px; margin-top: 10px; width: 100%"
        />
      </div>
      <div>
        <label for="email">メールアドレス:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="メールアドレスを入力"
          style="padding: 8px; margin-top: 10px; width: 100%"
        />
      </div>
      <div>
        <label for="password">パスワード:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="パスワードを入力"
          style="padding: 8px; margin-top: 10px; width: 100%"
        />
      </div>
      <div>
        <label for="confirmPassword">パスワード再入力:</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="パスワードを再入力"
          style="padding: 8px; margin-top: 10px; width: 100%"
        />
      </div>
      <button
        @click="createUser"
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
        アカウント作成
      </button>
      <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    </template>
  </WelcomeItem>
</template>
