from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.schemas import (
    StudentProgressCreate,
    StudentProgressUpdate,
    StudentProgressResponse,
)
from app.services import crud

router = APIRouter(prefix="/api/progress", tags=["Student Progress"])


@router.post(
    "",
    response_model=StudentProgressResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Log learning task or course progress",
    description="Records a new study task, lab execution, or course progress entry.",
)
def create_progress(
    progress_in: StudentProgressCreate, db: Session = Depends(get_db)
):
    student = crud.get_student(db, progress_in.student_id)
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with ID {progress_in.student_id} not found.",
        )
    if progress_in.course_id:
        course = crud.get_course(db, progress_in.course_id)
        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Course with ID {progress_in.course_id} not found.",
            )
    return crud.create_progress(db, progress_in)


@router.get(
    "",
    response_model=List[StudentProgressResponse],
    summary="List student progress records",
    description="Retrieve progress records for a student, optionally filtered by course_id.",
)
def list_progress(
    student_id: Optional[int] = None,
    course_id: Optional[int] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    if student_id:
        return crud.get_progress_by_student(
            db,
            student_id=student_id,
            course_id=course_id,
            skip=skip,
            limit=limit,
        )
    from sqlalchemy import select
    from app.models.db_models import StudentProgress

    stmt = select(StudentProgress).offset(skip).limit(limit)
    return list(db.scalars(stmt).all())


@router.get(
    "/{progress_id}",
    response_model=StudentProgressResponse,
    summary="Get progress entry by ID",
    description="Retrieve a single progress entry.",
)
def get_progress(progress_id: int, db: Session = Depends(get_db)):
    progress = crud.get_progress(db, progress_id)
    if not progress:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Progress record with ID {progress_id} not found.",
        )
    return progress


@router.put(
    "/{progress_id}",
    response_model=StudentProgressResponse,
    summary="Update progress entry",
    description="Update status (in_progress / completed), percentage, or time spent.",
)
def update_progress(
    progress_id: int,
    progress_in: StudentProgressUpdate,
    db: Session = Depends(get_db),
):
    updated = crud.update_progress(db, progress_id, progress_in)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Progress record with ID {progress_id} not found.",
        )
    return updated


@router.delete(
    "/{progress_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete progress entry",
    description="Removes a progress record.",
)
def delete_progress(progress_id: int, db: Session = Depends(get_db)):
    success = crud.delete_progress(db, progress_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Progress record with ID {progress_id} not found.",
        )
    return None
