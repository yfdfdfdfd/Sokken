<script setup lang="ts">
import { ref } from 'vue'

const Problem = ref(
  'ディープラーニングとニューラルネットワークに関する以下のアからエまでの記述のうち、最も適切ではないものを１つ選びなさい。'
)
// 後にデータベースから問題を取得するように修正予定
const list = ref([
  'ア．	ディープラーニングは、画像認識、音声認識などの精度が格段に向上するなどの成果をもたらし、AI技術の発達に大きな影響を与えている。',
  'イ．	ニューラルネットワークは入力層、中間層（隠れ層）、出力層の３層から成り立っている。',
  'ウ．	ニューラルネットワークのうち、中間層（隠れ層）が複数の層となっているものを用いるのがディープラーニングである。',
  'エ．	ディープラーニングでは、学習対象となる変数（特徴量）を定義して入力する必要がある。'
])
</script>

<template>
  <div class="question-container">
    <h2>問題</h2>
    <h3>{{ Problem }}</h3>
    <ul>
      <li v-for="(option, index) in list" :key="index">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.question-container {
  font-size: 15px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}
</style>
