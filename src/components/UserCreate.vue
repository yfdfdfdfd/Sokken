<script setup lang="ts">
import { ref } from 'vue'
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import { DefaultApi, Configuration } from '../generated'
import router from '../router'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const dialog = ref(false)

async function createUser() {
  console.log('createUser function called')

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'パスワードが一致しません'
    return
  }

  if (password.value === '' || email.value === '' || name.value === '') {
    errorMessage.value = '名前、メールアドレス、パスワードを入力してください'
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
    dialog.value = true

    if (dialog.value) {
      setTimeout(() => {
        router.replace('/')
      }, 2500)
    }
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
    <template #heading>アカウント作成</template>
    <template #default>
      <div>
        <label for="name">名前:</label>
        <input type="text" id="name" v-model="name" placeholder="名前を入力" class="input-style" />
      </div>
      <div>
        <label for="email">メールアドレス:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="メールアドレスを入力"
          class="input-style"
        />
      </div>

      <div>
        <label for="password">パスワード:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="パスワードを入力"
          class="input-style"
        />
      </div>
      <div>
        <label for="confirmPassword">パスワード再入力:</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="パスワードを再入力"
          class="input-style"
        />
      </div>
      <button class="create-button" @click="createUser">アカウント作成</button>
      <p v-if="errorMessage" style="color: #f6aa00">{{ errorMessage }}</p>

      <div
        v-if="dialog"
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
          <!-- Dialog for success message -->
          <v-dialog v-model="dialog" max-width="500">
            <v-card>
              <v-card-text class="dialog-text">アカウント作成が完了しました</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="dialog = false">閉じる</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </template>
  </WelcomeItem>
</template>

<style scoped>
.input-style {
  padding: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  background: var(--color-background);
  color: var(--color-text);
  border: 1px solid #ccc;
}

.dialog-text {
  text-align: center;
  font-size: 20px;
}

.create-button {
  margin-top: 20px;
  padding: 10px 20px;
  width: 100%;
  background-color: #34a3d1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
