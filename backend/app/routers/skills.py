from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.schemas import SkillCreate, SkillUpdate, SkillResponse
from app.services import crud

router = APIRouter(prefix="/api/skills", tags=["Skills"])


@router.post(
    "",
    response_model=SkillResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new skill definition",
    description="Add a verified technical skill to the competency matrix.",
)
def create_skill(skill_in: SkillCreate, db: Session = Depends(get_db)):
    existing = crud.get_skill_by_name(db, skill_in.name)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Skill '{skill_in.name}' already exists in catalog.",
        )
    return crud.create_skill(db, skill_in)


@router.get(
    "",
    response_model=List[SkillResponse],
    summary="List technical skills",
    description="Retrieve skills, optionally filtered by category (e.g. 'Agentic AI', 'Prompt Engineering').",
)
def list_skills(
    category: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    return crud.get_skills(db, category=category, skip=skip, limit=limit)


@router.get(
    "/{skill_id}",
    response_model=SkillResponse,
    summary="Get skill by ID",
    description="Retrieve details of a specific technical skill.",
)
def get_skill(skill_id: int, db: Session = Depends(get_db)):
    skill = crud.get_skill(db, skill_id)
    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Skill with ID {skill_id} not found.",
        )
    return skill


@router.put(
    "/{skill_id}",
    response_model=SkillResponse,
    summary="Update skill",
    description="Modify a skill's name, category, or description.",
)
def update_skill(
    skill_id: int, skill_in: SkillUpdate, db: Session = Depends(get_db)
):
    if skill_in.name:
        existing = crud.get_skill_by_name(db, skill_in.name)
        if existing and existing.id != skill_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Skill name '{skill_in.name}' is already used.",
            )
    updated = crud.update_skill(db, skill_id, skill_in)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Skill with ID {skill_id} not found.",
        )
    return updated


@router.delete(
    "/{skill_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a skill",
    description="Removes a skill entry from the catalog.",
)
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    success = crud.delete_skill(db, skill_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Skill with ID {skill_id} not found.",
        )
    return None
