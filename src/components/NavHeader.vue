<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dialog = ref(false)

const logout = () => {
  localStorage.removeItem('token')
  router.replace('/')
  dialog.value = false
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar">
        <RouterLink to="/welcome">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/practice">Practice</RouterLink>
        <RouterLink to="/history">History</RouterLink>
        <a href="#" @click.prevent="dialog = true">Logout</a>
      </nav>
    </div>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">ログアウト確認</v-card-title>
        <v-card-text>本当にログアウトしますか？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" @click="dialog = false">キャンセル</v-btn>
          <v-btn color="#d2691e" @click="logout">ログアウト</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  margin: 0;
  padding: 0;
}

.wrapper {
  width: 100%;
  margin: 0;
  padding: 0;
}

nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  padding: 0;
  margin: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav a,
nav .router-link-active {
  display: inline-block;
  width: 100%;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  transition:
    color 0.3s,
    border-color 0.3s;
}

nav a:hover {
  color: var(--color-hover);
  border-bottom: 2px solid var(--color-hover);
}

nav a.router-link-active {
  color: var(--color-text);
}

.navbar {
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: var(--color-background);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 70px;
}

.navbar :hover {
  background: var(--color-background--hover);
  border-bottom: 2px solid var(--color-hover);
}

@media (min-width: 1024px) {
  header {
    place-items: center;
    padding-right: 0;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    font-size: 16px;
    padding: 0 1.5rem;
  }
}
</style>
