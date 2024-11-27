from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from weakpoint_analysis import analyze_weak_points
from feedback import generate_feedback

router = APIRouter()

@router.get("/weakpoints/{user_id}")
def get_weak_points(user_id: int, db: Session = Depends(get_db)):
    weak_points = analyze_weak_points(user_id, db)
    return weak_points

@router.get("/feedback/{tag}")
def get_feedback(tag: str, db: Session = Depends(get_db)):
    feedback = generate_feedback(tag, db)
    return {"feedback": feedback}
