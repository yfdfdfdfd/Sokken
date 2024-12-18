<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue';
import { useTimerStore } from '@/stores/timer'
import { useAnswerStatusStore } from '@/stores/answerstatus';
// import router from '@/router';

const timerStore = useTimerStore()
const answerStatusStore = useAnswerStatusStore()
const { finishtime } = timerStore
const { getStatus } = answerStatusStore

</script>

<template>
    <NavHeader />
    <main>
    <div>
        <h1>結果</h1>
        <p>お疲れ様でした！</p>
        <p v-if="finishtime">
            あなたの回答時間は{{finishtime}}秒です。</p>
        <p v-else>タイマーは設定されていません。</p>
        <div class="result"> 
            <div v-for="(status, index) in getStatus()" :key="index">
                <div class="result-count">{{ index + 1 }}</div>
                <div class="result-item">{{ status != undefined ? status==true ? "◯":"✕":"未回答"}}</div>
            </div>      
        </div>
        <!-- <button class="button" @click="() => { router.replace('/welcome');}">ホームに戻る</button> -->
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
        background-color: #34a3d1;
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
        background-color: auto;
    }

    .button:active {
        background-color: auto;
    }

    .result {
        display: flex;
        margin-top: 20px;
        flex-wrap: wrap;
    }

    .result > div {
        display: flex;
        flex-direction: column;
        
    }

    .result > div > div {
        border: 1px solid #ccc;
        width: 100px;
        padding:0px 10px;
    }
</style>
