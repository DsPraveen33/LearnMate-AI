from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.schemas import StudentCreate, StudentUpdate, StudentResponse
from app.services import crud

router = APIRouter(prefix="/api/students", tags=["Students"])


@router.post(
    "",
    response_model=StudentResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new student profile",
    description="Creates a new student account and sets up their initial learning attributes.",
)
def create_student(student_in: StudentCreate, db: Session = Depends(get_db)):
    existing = crud.get_student_by_email(db, student_in.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Student with email '{student_in.email}' is already registered.",
        )
    return crud.create_student(db, student_in)


@router.get(
    "",
    response_model=List[StudentResponse],
    summary="List all registered students",
    description="Retrieve a paginated list of students.",
)
def list_students(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    return crud.get_students(db, skip=skip, limit=limit)


@router.get(
    "/{student_id}",
    response_model=StudentResponse,
    summary="Get student by ID",
    description="Retrieve a specific student's full profile, learning track, and stats.",
)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = crud.get_student(db, student_id)
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with ID {student_id} not found.",
        )
    return student


@router.put(
    "/{student_id}",
    response_model=StudentResponse,
    summary="Update student profile",
    description="Update a student's career aspirations, learning preferences, streak, or stats.",
)
def update_student(
    student_id: int, student_in: StudentUpdate, db: Session = Depends(get_db)
):
    if student_in.email:
        existing = crud.get_student_by_email(db, student_in.email)
        if existing and existing.id != student_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Email '{student_in.email}' is already taken by another account.",
            )
    updated = crud.update_student(db, student_id, student_in)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with ID {student_id} not found.",
        )
    return updated


@router.delete(
    "/{student_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a student profile",
    description="Deletes a student and cascades deletion across their roadmaps, assessments, and progress records.",
)
def delete_student(student_id: int, db: Session = Depends(get_db)):
    success = crud.delete_student(db, student_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with ID {student_id} not found.",
        )
    return None
