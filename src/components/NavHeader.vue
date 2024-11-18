<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const confirmLogout = (event: Event) => {
    event.preventDefault(); // 最初にデフォルトの動作を防ぐ
    if (confirm('ログアウトしますか?')) {
        localStorage.removeItem('token');
        router.replace('/');
    }
};
</script>

<template>
    <header>
        <div class="wrapper">
            <nav class="navbar">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/feedback">Feedback</RouterLink>
                <RouterLink to="/quize/0">Quize</RouterLink>
                <RouterLink to="/history">History</RouterLink>
                <a href="#" @click="confirmLogout">Logout</a>
            </nav>
        </div>
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
}

nav a:first-of-type {
    border: 0;
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

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    width: auto;
    background-color: auto;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}
</style>
