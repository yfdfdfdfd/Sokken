# GPU対応のPyTorchイメージをベースにする
FROM pytorch/pytorch:2.5.0-cuda12.4-cudnn9-runtime

# 必要なライブラリをインストール
# ここでrequirements.txtを使って一度にインストールします
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# 作業ディレクトリを設定
WORKDIR /app

# ソースコードをコンテナにコピー
COPY . /app

# Flaskアプリケーションを起動
CMD ["python", "app.py"]
