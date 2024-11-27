from sqlalchemy.orm import Session
from models import FeedbackTemplateModel

def generate_feedback(tag: str, db: Session):
    feedback_template = db.query(FeedbackTemplateModel).filter(FeedbackTemplateModel.tag == tag).first()

    if feedback_template:
        return feedback_template.feedback
    return f"We recommend reviewing topics related to '{tag}' for improvement."
