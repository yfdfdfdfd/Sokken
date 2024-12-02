FROM python:3.10.13

ENV PATH /root/.local/bin:$PATH

COPY pyproject.toml poetry.lock ./

RUN apt update && apt -y upgrade \
    && curl -sSL https://install.python-poetry.org | python3 - \
    && poetry config virtualenvs.create false \
    && poetry install
