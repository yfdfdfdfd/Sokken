# PyTorch公式イメージをベースにする
FROM pytorch/pytorch:2.5.0-cuda12.4-cudnn9-runtime

# 必要なライブラリをインストール
RUN pip install --no-cache-dir flask transformers flask-cors

# 作業ディレクトリを設定
WORKDIR /app

# ソースコードをコンテナにコピー
COPY . /app

# Flaskアプリケーションを起動
CMD ["python", "app.py"]
