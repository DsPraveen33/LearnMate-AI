from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.schemas import AssessmentResultCreate, AssessmentResultResponse
from app.services import crud

router = APIRouter(prefix="/api/assessments", tags=["Assessments"])


@router.post(
    "",
    response_model=AssessmentResultResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit diagnostic skill assessment result",
    description="Logs a student's technical score, strengths, and areas for improvement.",
)
def create_assessment(
    assessment_in: AssessmentResultCreate, db: Session = Depends(get_db)
):
    student = crud.get_student(db, assessment_in.student_id)
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with ID {assessment_in.student_id} not found.",
        )
    return crud.create_assessment(db, assessment_in)


@router.get(
    "",
    response_model=List[AssessmentResultResponse],
    summary="List assessment results",
    description="Retrieve historical assessment logs, optionally filtered by student_id.",
)
def list_assessments(
    student_id: Optional[int] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    if student_id:
        return crud.get_assessments_by_student(
            db, student_id=student_id, skip=skip, limit=limit
        )
    # Generic query
    from sqlalchemy import select
    from app.models.db_models import AssessmentResult

    stmt = select(AssessmentResult).offset(skip).limit(limit)
    return list(db.scalars(stmt).all())


@router.get(
    "/{assessment_id}",
    response_model=AssessmentResultResponse,
    summary="Get assessment result by ID",
    description="Retrieve a single assessment report including question-level answers.",
)
def get_assessment(assessment_id: int, db: Session = Depends(get_db)):
    assessment = crud.get_assessment(db, assessment_id)
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Assessment with ID {assessment_id} not found.",
        )
    return assessment
