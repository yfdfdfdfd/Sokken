<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue';
import { useTimerStore } from '@/stores/timer'
import { useCounterStore } from '@/stores/counter'
import router from '@/router';

const timerStore = useTimerStore()
const counterStore = useCounterStore()

const { getPastTime } = timerStore
const { correct } = counterStore

</script>

<template>
    <NavHeader />
    <main>
    <div>
        <h1>結果</h1>
        <p>お疲れ様でした！</p>
        <p>あなたの正解数は{{correct}}問です。</p>
        <p v-if="getPastTime() !== undefined">
            あなたの回答時間は{{ getPastTime()-1}}秒です。</p>
            <!-- あなたの解答時間は{{ getPastTime()}}分です。</p> -->
        <p v-else>タイマーが設定されていません。</p>
        <button class="button" @click="router.replace('/welcome')">ホームに戻る</button>
    </div>
    </main>
</template>


<style scoped>
    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        top: 50%;
    }
    p {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: center;
        top: 50%;
    }

    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .button {
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        margin-top: 30px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .button:hover {
        background-color: #45a049;
    }

    .button:active {
        background-color: #3e8e41;
    }
</style>
