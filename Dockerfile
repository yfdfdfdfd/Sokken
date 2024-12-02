#ベースイメージ
FROM nvidia/cuda:11.8.0-base-ubuntu22.04

#必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    git \
    wget \
    curl \
    && apt-get clean

#Pythonのデフォルトバージョンを設定
RUN ln -s /usr/bin/python3 /usr/bin/python

#必要なPythonライブラリをインストール
RUN pip install --upgrade pip
RUN pip install \
    transformers \
    datasets \
    accelerate \
    torch \
    torchvision \
    torchaudio \
    sentencepiece

#作業ディレクトリを作成
WORKDIR /workspace

#デフォルトのコマンド
CMD ["/bin/bash"]