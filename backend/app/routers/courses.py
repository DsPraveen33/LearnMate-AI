from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.schemas import CourseCreate, CourseUpdate, CourseResponse
from app.services import crud

router = APIRouter(prefix="/api/courses", tags=["Courses"])


@router.post(
    "",
    response_model=CourseResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new course",
    description="Add a structured course to the LearnMate AI catalog.",
)
def create_course(course_in: CourseCreate, db: Session = Depends(get_db)):
    existing = crud.get_course_by_code(db, course_in.code)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Course with code '{course_in.code}' already exists.",
        )
    return crud.create_course(db, course_in)


@router.get(
    "",
    response_model=List[CourseResponse],
    summary="List courses",
    description="Retrieve courses, with optional filtering by category and difficulty level.",
)
def list_courses(
    category: Optional[str] = None,
    level: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    return crud.get_courses(db, category=category, level=level, skip=skip, limit=limit)


@router.get(
    "/{course_id}",
    response_model=CourseResponse,
    summary="Get course by ID",
    description="Retrieve complete details, instructor information, and syllabus of a course.",
)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = crud.get_course(db, course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with ID {course_id} not found.",
        )
    return course


@router.put(
    "/{course_id}",
    response_model=CourseResponse,
    summary="Update course details",
    description="Update title, description, instructor, syllabus, or publication state.",
)
def update_course(
    course_id: int, course_in: CourseUpdate, db: Session = Depends(get_db)
):
    if course_in.code:
        existing = crud.get_course_by_code(db, course_in.code)
        if existing and existing.id != course_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Course code '{course_in.code}' is already assigned to another course.",
            )
    updated = crud.update_course(db, course_id, course_in)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with ID {course_id} not found.",
        )
    return updated


@router.delete(
    "/{course_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a course",
    description="Removes a course from the catalog.",
)
def delete_course(course_id: int, db: Session = Depends(get_db)):
    success = crud.delete_course(db, course_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with ID {course_id} not found.",
        )
    return None
