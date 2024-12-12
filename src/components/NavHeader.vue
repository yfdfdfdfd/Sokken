<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/counter'

const router = useRouter();
const dialog = ref(false);
const counterStore = useCounterStore()
const{ resetcrement } = counterStore

const logout = () => {
    localStorage.removeItem('token'); 
    router.replace('/'); 
    dialog.value = false; 
};
</script>

<template>
    <header>
        <div class="wrapper">
            <nav class="navbar">
                <RouterLink to="/welcome" @click="resetcrement">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/practice">Practice</RouterLink>
                <RouterLink to="/history">History</RouterLink>
                <a href="#" @click.prevent="dialog = true" @click="resetcrement">Logout</a>
            </nav>
        </div>

        <v-dialog v-model="dialog" max-width="400">
            <v-card>
                <v-card-title class="headline">ログアウト確認</v-card-title>
                <v-card-text>本当にログアウトしますか？</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" @click="dialog = false">キャンセル</v-btn>
                    <v-btn color="#d2691e"  @click="logout">ログアウト</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </header>
</template>



<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    transition: color 0.3s ease, border-color 0.3s ease; /* Add transition for color and border-color */
}

nav a:hover {
    color: var(--color-hover); /* Define a hover color */
    border-color: var(--color-hover); /* Change border color on hover */
}

nav a:first-of-type {
    border: 0;
}

.navbar {
    position: fixed;
    top: 0;
    width: auto;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

@media (min-width: 1024px) {
    header {
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;
        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>

