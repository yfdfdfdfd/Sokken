// server.js
import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

// Expressアプリの作成
const app = express()
app.use(cors()) // フロントエンドとのクロスオリジンリクエスト対応

// OpenAIのAPIキーを設定
const configuration = new Configuration({
  apiKey: 'YOUR_OPENAI_API_KEY' // OpenAI APIキーをここに記述
})
const openai = new OpenAIApi(configuration)

// 質問生成のエンドポイントを定義
app.get('/generate-question', async (req, res) => {
  try {
    const prompt = 'Generate a multiple-choice question about AI with 4 options.'
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150
    })

    const questionData = response.data.choices[0].text.trim()
    res.json({ question: questionData })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error generating question')
  }
})

// サーバーの起動
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
