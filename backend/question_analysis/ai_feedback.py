from transformers import GPT2LMHeadModel, GPT2Tokenizer
from sqlalchemy.orm import Session

def generate_ai_feedback(question: str, db: Session):
    # GPT-2 モデルとトークナイザーの読み込み
    model = GPT2LMHeadModel.from_pretrained("gpt2")
    tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
    
    # 質問に基づいてフィードバックを生成
    inputs = tokenizer.encode(question, return_tensors="pt")
    outputs = model.generate(inputs, max_length=100, num_return_sequences=1)
    feedback = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    # フィードバックをデータベースに保存（例）
    # feedback をフィードバックテーブルに保存する場合（仮定）
    # feedback_entry = FeedbackModel(question=question, feedback=feedback)
    # db.add(feedback_entry)
    # db.commit()
    
    return feedback
