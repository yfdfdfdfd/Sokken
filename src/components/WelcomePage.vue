<script setup lang="ts">
import { useAnswerStatusStore } from '@/stores/useAnswerStatusStore'
import router from '../router/index'
import { useTimerStore } from '@/stores/timer'
import { ref } from 'vue'

const answerStatusStore = useAnswerStatusStore()
const timerStore = useTimerStore()
const useTimer = ref<number>(50)

const { initStatus } = answerStatusStore
// ビュー遷移
async function transition() {
  initStatus(1)
  // initStatus(30)
  timerStore.setTimer(useTimer.value)
  router.replace('/quize/0')
}

// 時間スライダーの更新
function updateTime(event: Event) {
  const input = event.target as HTMLInputElement
  useTimer.value = parseInt(input.value, 10) || 1 // 入力値を整数として取得
  console.log(`制限時間: ${useTimer.value} 秒`)
  // console.log(`New time: ${useTimer.value} 分`);
}
</script>

<template>
  <div>
    <div class="title">
      <i class="imageLabel setting">設定</i>
    </div>
    <div class="contents">
      <!-- 設定項目: 解答方式 -->
      <div class="settingItem">
        <div class="settingLabel">解答方式</div>
        <div class="settingComponent">
          <label>
            <span class="radioButton">
              <input type="radio" name="inputMode" value="roman" checked />
            </span>
            <span class="radioLabel">選択式</span>
          </label>
        </div>
      </div>

      <!-- 設定項目: 制限時間 -->
      <div class="settingItem">
        <div class="settingLabel">制限時間</div>
        <div class="settingComponent">
          <div>
            <div style="text-align: right">{{ useTimer }}秒</div>
            <!-- <div style="text-align: right;">{{ useTimer }}分</div> -->
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              :value="useTimer"
              class="slider"
              style="width: 100%"
              @input="updateTime"
            />
          </div>
        </div>
      </div>

      <!-- 設定項目: 正誤判定
            <div class="settingItem">
                <div class="settingLabel">正誤判定</div>
                <div class="settingComponent">
                    <label>
                        <input type="checkbox" v-model="isJudgementEnabled">
                        <span style="margin-left: 5px;">正誤判定を無効にする</span>
                    </label>
                </div>
            </div> -->
    </div>

    <!-- 説明文 -->
    <div class="description">
      <ul>
        <li>検定カテゴリー合格基準と同じ時間に設定する場合は「50分」で設定してください。</li>
        <li>お名前など個人を特定するデータ及び成績はシステム上に保存されません。</li>
      </ul>
    </div>

    <!-- ナビゲーションボタン -->
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
  background-color: #34a3d1;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.typingButton:hover {
  background-color: auto;
}

.typingButton:active {
  background-color: auto;
}

.imageLabel {
  font-size: 14px;
  color: #888;
}
</style>
