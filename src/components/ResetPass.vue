<script setup lang="ts">
import { ref } from 'vue'
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import { DefaultApi, Configuration } from '../generated'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const dialogVisible = ref(false)

async function createUser() {
  console.log('createUser function called')

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
    console.log('User created:', response)
    errorMessage.value = ''
    name.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    dialogVisible.value = true
  } catch (error) {
    console.error('Error creating user:', error)
    errorMessage.value = 'アカウント作成に失敗しました'
  }
}
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
          v-model="email"
          placeholder="メールアドレスを入力"
          style="padding: 8px; margin-top: 10px; width: 100%"
        />
      </div>

      <div>
        <label for="password">新規パスワード:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="新規パスワードを入力"
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
        パスワードを更新
      </button>
      <p v-if="errorMessage" style="color: #ff4b00">{{ errorMessage }}</p>

      <!-- Dialog for success message -->
      <div
        v-if="dialogVisible"
        style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.5);
        "
      >
        <div
          style="
            background: white;
            color: #000;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
          "
        >
          <p>パスワードの更新が完了しました</p>
          <button
            @click="dialogVisible = false"
            style="
              margin-top: 10px;
              padding: 8px 16px;
              background-color: #4caf50;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            "
          >
            OK
          </button>
        </div>
      </div>
    </template>
  </WelcomeItem>
</template>
