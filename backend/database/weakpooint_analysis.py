from typing import List

def analyze_weakpoints(user_answers: List[dict]) -> List[int]:
    """
    ユーザーの回答履歴を基に苦手分野を分析し、再出題する問題IDを決定する関数

    Args:
        user_answers (List[dict]): ユーザーの回答履歴

    Returns:
        List[int]: 再出題する質問IDのリスト
    """
    incorrect_questions = [
        answer["question_id"] for answer in user_answers if not answer["is_correct"]
    ]
    # 再出題する質問をランダムに選択
    return incorrect_questions[:5]
