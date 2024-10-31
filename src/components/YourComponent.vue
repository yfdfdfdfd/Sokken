<script>
  export default {
    data() {
      return {
        question: "", // 質問を保存するための変数
        error: null  // エラーメッセージを保存する変数
      };
    },
    methods: {
      async generateQuestion() {
        try {
          // POSTリクエストを送信
          const response = await fetch('http://127.0.0.1:5000/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: "AI検定に関する質問を作成してください。" }) // プロンプトを送信
          });
          
          if (!response.ok) {  // レスポンスがOKでない場合エラーを投げる
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          const data = await response.json();
          this.question = data.question;  // 受け取った質問を設定
        } catch (error) {
          console.error("Fetch error:", error);
          this.error = "問題の生成中にエラーが発生しました。"; // エラーメッセージを設定
        }
      }
    }
  };
</script>

<template>
    <div>
      <button @click="generateQuestion">問題生成</button>
      <p v-if="question">{{ question }}</p>
      <p v-if="error" class="error">{{ error }}</p> <!-- エラー表示 -->
    </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
