from typing import List
import random

def generate_feedback(user_answers: List[dict], feedback_templates: List[dict]) -> str:
    """
    ユーザーの解答履歴を基にフィードバックを生成する関数

    Args:
        user_answers (List[dict]): ユーザーの回答履歴
        feedback_templates (List[dict]): フィードバックテンプレート

    Returns:
        str: フィードバックメッセージ
    """
    incorrect_tags = [
        answer["tag"] for answer in user_answers if not answer["is_correct"]
    ]
    if not incorrect_tags:
        return "すべて正解です！素晴らしいです！"

    feedback = []
    for tag in set(incorrect_tags):
        template = random.choice(
            [ft["feedback"] for ft in feedback_templates if ft["tag"] == tag]
        )
        feedback.append(template)

    return " ".join(feedback)
