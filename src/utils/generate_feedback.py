from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import logging
from openai import OpenAI
import traceback

# FastAPIインスタンスの作成
app = FastAPI()
 
# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 必要に応じて特定のオリジンに制限
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ログ設定
logging.basicConfig(level=logging.DEBUG)
 
# Ollama APIクライアントの設定
client = OpenAI(
    base_url='http://localhost:11434/v1',
    api_key='ollama',  # required, but unused
)
 
# リクエストデータのモデル定義
class Question(BaseModel):
    tag: str
    is_correct: bool
    time_taken: float
 
# # エンドポイント定義
# @app.post("/generate-feedback")
# async def generate_feedback(request: Request):
#     try:
#         data = await request.json()
#         logging.debug(f"Received data: {data}")
#         status = data.get('status', [])
#         questions = [Question(**item) for item in status]

#         # # 入力データの検証
#         # if not isinstance(data, list) or not all('tag' in item and 'is_correct' in item and 'time_taken' in item for item in data):
#         #     raise HTTPException(status_code=400, detail="Invalid input format") 
#         # questions = [Question(**item) for item in data]
 
#         # 各カテゴリのフィードバックを生成
#         feedback_results = {
#             '深層学習': generate_feedback_by_tag('深層学習', questions),
#             '法規・倫理': generate_feedback_by_tag('法規・倫理', questions),
#             '基礎数学': generate_feedback_by_tag('基礎数学', questions),
#             'AI概論': generate_feedback_by_tag('AI概論', questions),
#             '機械学習': generate_feedback_by_tag('機械学習', questions)
#         }
 
#         logging.debug(f"Generated feedback: {feedback_results}")
#         return feedback_results
#     except Exception as e:
#         logging.error(f"Error: {e}")
#         raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-feedback")
async def generate_feedback(request: Request):
    try:
        data = await request.json()
        logging.debug(f"Received data: {data}")

        status = data.get('status', [])
        questions = [
            Question(tag=str(item['questionId']), is_correct=item['isCorrect'], time_taken=0)
            for item in status
        ]

        feedback_results = {
            '深層学習': generate_feedback_by_tag('深層学習', questions),
            '法規・倫理': generate_feedback_by_tag('法規・倫理', questions),
            '基礎数学': generate_feedback_by_tag('基礎数学', questions),
            'AI概論': generate_feedback_by_tag('AI概論', questions),
            '機械学習': generate_feedback_by_tag('機械学習', questions)
        }

        logging.debug(f"Generated feedback: {feedback_results}")
        return feedback_results

    except Exception as e:
        logging.error(f"Error: {e}")
        logging.error(traceback.format_exc())  # トレースバックを追加
        raise HTTPException(status_code=500, detail="Internal Server Error")

# タグごとにフィードバックを生成する関数
def generate_feedback_by_tag(tag: str, data: List[Question]) -> str:
    # タグに関連付けられた問題の取得
    tagged_questions = [item for item in data if item.tag == tag]
 
    if not tagged_questions:
        return f"{tag}に関連するデータがありません。"
 
    correct_count = sum(item.is_correct for item in tagged_questions)
    total_count = len(tagged_questions)
    avg_response_time = sum(item.time_taken for item in tagged_questions) / total_count
 
    feedback = f"{tag}の正答率は{correct_count}/{total_count}で、平均解答時間は{avg_response_time:.2f}秒です。復習を行い、理解を深めましょう。\n"
 
    # フィードバックをOLLAMAに生成させる
    response = client.chat.completions.create(
        model="ELYZA",
        messages=[
            {"role": "system", "content": "あなたはAI検定の指導者で、受験者に役立つ日本語のフィードバックを提供します。フィードバックは簡潔で正確にし、不要な英語や冗長な情報は含めないでください。"},
            {"role": "user", "content": feedback}
        ]
    )
 
    # フィードバックの出力
    ollama_feedback = response.choices[0].message.content.strip()  # 不要な空白を削除
    return ollama_feedback
 
if __name__ == '__main__':
    import uvicorn
    uvicorn.run("generate_feedback:app", host="0.0.0.0", port=5000, reload=True)


