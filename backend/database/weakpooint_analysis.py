#過去の解答データを分析し、ユーザーの弱点を特定

from sqlalchemy.orm import Session
from models import UserAnswerModel, QuestionModel

def analyze_weak_points(user_id: int, db: Session):
    # ユーザーが回答した質問データを取得
    user_answers = db.query(UserAnswerModel).filter(UserAnswerModel.user_id == user_id).all()

    if not user_answers:
        return {"message": "No answers available for analysis"}

    incorrect_answers = [
        answer for answer in user_answers if not answer.is_correct
    ]

    # タグごとの不正解数を集計
    weak_points = {}
    for answer in incorrect_answers:
        question = db.query(QuestionModel).filter(QuestionModel.id == answer.question_id).first()
        if question and question.tag:
            weak_points[question.tag] = weak_points.get(question.tag, 0) + 1

    # 不正解が多いタグを返す
    sorted_weak_points = sorted(weak_points.items(), key=lambda x: x[1], reverse=True)
    return {"weak_points": sorted_weak_points}

