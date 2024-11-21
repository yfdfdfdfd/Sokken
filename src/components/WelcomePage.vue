<script setup lang="ts">
import { ref } from 'vue';
import router from '../router/index';

const timer = ref(50);

async function transition() {
    router.replace('/quize/0');
}

function updateTime(event: Event) {
    const input = event.target as HTMLInputElement;
    timer.value = parseInt(input.value);
    console.log(`New time: ${input.value}`);
}
</script>

<template>
    <div>
        <div class="title">
            <i class="imageLabel setting">設定</i>
        </div>
        <div class="contents">
            <div class="settingItem">
                <div class="settingLabel">解答方式</div>
                <div class="settingComponent">
                    <label>
                        <span class="radioButton">
                            <input type="radio" name="inputMode" value="roman" checked>
                            
                        </span>
                        <span class="radioLabel">選択式</span>
                    </label>
                </div>
            </div>
            <div class="settingItem">
                <div class="settingLabel">制限時間</div>
                <div class="settingComponent">
                    <div>
                        <div style="text-align: right;">{{ timer }}分</div>
                            <input type="range" min="1" max="50" value="50" class="slider" style="width: 100%;" @input="updateTime">
                        </div>
                    </div>
                </div>
            </div>
            <div class="description">
                <ul>
                    <li>検定カテゴリー合格基準と同じ時間に設定する場合は「５０分」で設定してください。</li>
                    <li>お名前など個人を特定するデータ及び成績は弊社システム上に保存されません。</li>
                </ul>
            </div>
            <div class="nav">
                <button class="typingButton" @click="transition">解答を開始する</button>
            </div>
        </div>
</template>

<style scoped>

.title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0;
}

.contents {
    margin: 0 auto;
    padding: 20px;
    max-width: 600px;
    /* background-color: #f9f9f9; */
    background-color: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 設定アイテム */
.settingItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.settingLabel {
    font-size: 18px;
    font-weight: 500;
}

.settingComponent {
    display: flex;
    align-items: center;
}

.radioButton {
    display: flex;
    align-items: center;
    margin-right: 10px;
}

.radioButton input {
    display: none;
}

.radioButton .checked {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #4caf50;
    border: 2px solid #4caf50;
    margin-right: 5px;
}

.radioLabel {
    font-size: 16px;
}

[data-progress] {
    position: relative;
    width: 100%;
    height: 8px;
    background-color: #ddd;
    border-radius: 4px;
    margin-top: 10px;
}

[data-progress] .slider {
    position: absolute;
    top: -4px;
    left: calc(100% - 10px); /* 初期位置を右端に */
    width: 20px;
    height: 20px;
    background-color: #4caf50;
    border: none;
    border-radius: 50%;
    cursor: pointer;
}

/* 説明文 */
.description {
    margin-top: 20px;
    font-size: 14px;
    color: #666;
}

.description ul {
    padding-left: 20px;
}

.description li {
    margin-bottom: 10px;
    line-height: 1.5;
}

.nav {
    margin-top: 20px;
    text-align: center;
}

.typingButton {
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.typingButton:hover {
    background-color: #45a049;
}

.typingButton:active {
    background-color: #3e8e41;
}
.imageLabel {
    font-size: 14px;
    color: #888;
}
</style>

