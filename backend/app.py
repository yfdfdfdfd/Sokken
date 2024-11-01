from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch
from flask_cors import CORS  # CORSをインポート

app = Flask(__name__)
CORS(app)  # CORSを有効にする

# モデルの初期化
model_name = "gpt2"
model = GPT2LMHeadModel.from_pretrained(model_name).to("cuda")  # モデルをGPUに移動
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

@app.route('/')
def home():
    return jsonify(message="Welcome to the AI question generator!")

@app.route('/generate', methods=['POST'])
def generate_question():
    try:
        # JSONデータをリクエストから取得
        data = request.json
        prompt = data.get('prompt', '')

        # モデルへの入力を準備し、質問を生成
        inputs = tokenizer.encode(prompt, return_tensors="pt").to("cuda")  # GPU使用
        outputs = model.generate(inputs, max_length=100, num_return_sequences=1)
        question = tokenizer.decode(outputs[0], skip_special_tokens=True)

        return jsonify({'question': question})  # JSON形式で返す
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500  # エラーメッセージを返す

if __name__ == '__main__':
    # CUDAが利用可能かどうかを確認
    if torch.cuda.is_available():
        print("CUDA is available. Running on GPU.")
    else:
        print("CUDA is not available. Running on CPU.")
        
    app.run(host='0.0.0.0', port=5000)
