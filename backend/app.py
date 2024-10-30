from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

app = Flask(__name__)

# モデルの初期化
model_name = "gpt2"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

@app.route('/generate', methods=['POST'])
def generate_question():
    data = request.json
    prompt = data.get('prompt', '')
    
    inputs = tokenizer.encode(prompt, return_tensors="pt").to("cuda")  # GPU使用
    outputs = model.generate(inputs, max_length=100, num_return_sequences=1)
    question = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    return jsonify({'question': question})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
