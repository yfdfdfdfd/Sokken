<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import { DefaultApi, Configuration } from '../generated'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import router from '../router/router'
import { useLoginStore } from '@/stores/useLoginStore'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loginStore = useLoginStore()

async function loginUser() {
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
    errorMessage.value = ''
    console.log('User logged in:', response)

    const { token } = response
    loginStore.login({ token })
    router.replace('/welcome')
  } catch (error) {
    console.error('Error logging in:', error)
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
          class="input-text"
          type="email"
          id="email"
          placeholder="メールアドレスを入力"
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
        <label for="password">パスワード:</label>
        <input
          class="input-text"
          type="password"
          id="password"
          placeholder="パスワードを入力"
          v-model="password"
        />
        <div class="link-container">
          <router-link to="/create">アカウント新規作成</router-link>
          <router-link to="/forget">パスワードを忘れた</router-link>
        </div>
        <button class="login-button" @click="loginUser">ログイン</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </template>
  </WelcomeItem>
</template>

<style scoped>
.input-text {
  padding: 8px;
  margin-top: 10px;
  width: 100%;
  border: 1px solid #ccc;
  background-color: var(--color-background);
  color: var(--color-text);
}
.link-container {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
.login-button {
  margin-top: 20px;
  padding: 10px 20px;
  width: 100%;
  background-color: #34a3d1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.error-message {
  color: #f6aa00;
  margin-top: 5px;
}
</style>
