<script setup lang="ts">
import router from '../router'

// ビュー遷移
async function transition() {
  router.replace('/quizepractice/1')
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
            <span class="radioLabel">選択式</span>
          </label>
        </div>
      </div>
      <div class="settingItem">
        <div class="settingLabel">正誤判定</div>
        <div class="settingComponent">
          <label>
            <span style="margin-left: 5px">正誤判定をする</span>
          </label>
        </div>
      </div>
    </div>

    <div class="description">
      <ul>
        <li>本番を想定して試験される場合はHOMEをご利用ください。</li>
        <li>お名前など個人を特定するデータ及び成績はシステム上に保存されません。</li>
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
  width: 553.1px;
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

.radioLabel {
  font-size: 16px;
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

.imageLabel {
  font-size: 14px;
  color: #888;
}
</style>
