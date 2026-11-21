from typing import Optional, List
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.db_models import (
    Student,
    Skill,
    Course,
    LearningRoadmap,
    AssessmentResult,
    StudentProgress,
)
from app.models.schemas import (
    StudentCreate,
    StudentUpdate,
    SkillCreate,
    SkillUpdate,
    CourseCreate,
    CourseUpdate,
    LearningRoadmapCreate,
    LearningRoadmapUpdate,
    AssessmentResultCreate,
    StudentProgressCreate,
    StudentProgressUpdate,
)


def utc_now():
    return datetime.now(timezone.utc)


# ==========================================
# Student CRUD
# ==========================================

def get_student(db: Session, student_id: int) -> Optional[Student]:
    return db.get(Student, student_id)


def get_student_by_email(db: Session, email: str) -> Optional[Student]:
    stmt = select(Student).where(Student.email == email)
    return db.scalars(stmt).first()


def get_students(db: Session, skip: int = 0, limit: int = 100) -> List[Student]:
    stmt = select(Student).offset(skip).limit(limit)
    return list(db.scalars(stmt).all())


def create_student(db: Session, student_in: StudentCreate) -> Student:
    student = Student(**student_in.model_dump())
    db.add(student)
    db.commit()
    db.refresh(student)
    return student


def update_student(db: Session, student_id: int, student_in: StudentUpdate) -> Optional[Student]:
    student = get_student(db, student_id)
    if not student:
        return None
    update_data = student_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(student, field, value)
    student.updated_at = utc_now()
    db.commit()
    db.refresh(student)
    return student


def delete_student(db: Session, student_id: int) -> bool:
    student = get_student(db, student_id)
    if not student:
        return False
    db.delete(student)
    db.commit()
    return True


# ==========================================
# Skill CRUD
# ==========================================

def get_skill(db: Session, skill_id: int) -> Optional[Skill]:
    return db.get(Skill, skill_id)


def get_skill_by_name(db: Session, name: str) -> Optional[Skill]:
    stmt = select(Skill).where(Skill.name == name)
    return db.scalars(stmt).first()


def get_skills(db: Session, category: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[Skill]:
    stmt = select(Skill)
    if category:
        stmt = stmt.where(Skill.category == category)
    stmt = stmt.offset(skip).limit(limit)
    return list(db.scalars(stmt).all())


def create_skill(db: Session, skill_in: SkillCreate) -> Skill:
    skill = Skill(**skill_in.model_dump())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill


def update_skill(db: Session, skill_id: int, skill_in: SkillUpdate) -> Optional[Skill]:
    skill = get_skill(db, skill_id)
    if not skill:
        return None
    update_data = skill_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(skill, field, value)
    db.commit()
    db.refresh(skill)
    return skill


def delete_skill(db: Session, skill_id: int) -> bool:
    skill = get_skill(db, skill_id)
    if not skill:
        return False
    db.delete(skill)
    db.commit()
    return True


# ==========================================
# Course CRUD
# ==========================================

def get_course(db: Session, course_id: int) -> Optional[Course]:
    return db.get(Course, course_id)


def get_course_by_code(db: Session, code: str) -> Optional[Course]:
    stmt = select(Course).where(Course.code == code)
    return db.scalars(stmt).first()


def get_courses(
    db: Session,
    category: Optional[str] = None,
    level: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
) -> List[Course]:
    stmt = select(Course)
    if category:
        stmt = stmt.where(Course.category == category)
    if level:
        stmt = stmt.where(Course.level == level)
    stmt = stmt.offset(skip).limit(limit)
    return list(db.scalars(stmt).all())


def create_course(db: Session, course_in: CourseCreate) -> Course:
    course = Course(**course_in.model_dump())
    db.add(course)
    db.commit()
    db.refresh(course)
    return course


def update_course(db: Session, course_id: int, course_in: CourseUpdate) -> Optional[Course]:
    course = get_course(db, course_id)
    if not course:
        return None
    update_data = course_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(course, field, value)
    db.commit()
    db.refresh(course)
    return course


def delete_course(db: Session, course_id: int) -> bool:
    course = get_course(db, course_id)
    if not course:
        return False
    db.delete(course)
    db.commit()
    return True


# ==========================================
# Learning Roadmap CRUD
# ==========================================

def get_roadmap(db: Session, roadmap_id: int) -> Optional[LearningRoadmap]:
    return db.get(LearningRoadmap, roadmap_id)


def get_roadmaps_by_student(
    db: Session, student_id: int, skip: int = 0, limit: int = 100
) -> List[LearningRoadmap]:
    stmt = (
        select(LearningRoadmap)
        .where(LearningRoadmap.student_id == student_id)
        .offset(skip)
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def create_roadmap(db: Session, roadmap_in: LearningRoadmapCreate) -> LearningRoadmap:
    roadmap = LearningRoadmap(**roadmap_in.model_dump())
    db.add(roadmap)
    db.commit()
    db.refresh(roadmap)
    return roadmap


def update_roadmap(
    db: Session, roadmap_id: int, roadmap_in: LearningRoadmapUpdate
) -> Optional[LearningRoadmap]:
    roadmap = get_roadmap(db, roadmap_id)
    if not roadmap:
        return None
    update_data = roadmap_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(roadmap, field, value)
    roadmap.updated_at = utc_now()
    db.commit()
    db.refresh(roadmap)
    return roadmap


def delete_roadmap(db: Session, roadmap_id: int) -> bool:
    roadmap = get_roadmap(db, roadmap_id)
    if not roadmap:
        return False
    db.delete(roadmap)
    db.commit()
    return True


# ==========================================
# Assessment Result CRUD
# ==========================================

def get_assessment(db: Session, assessment_id: int) -> Optional[AssessmentResult]:
    return db.get(AssessmentResult, assessment_id)


def get_assessments_by_student(
    db: Session, student_id: int, skip: int = 0, limit: int = 100
) -> List[AssessmentResult]:
    stmt = (
        select(AssessmentResult)
        .where(AssessmentResult.student_id == student_id)
        .order_by(AssessmentResult.taken_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def create_assessment(
    db: Session, assessment_in: AssessmentResultCreate
) -> AssessmentResult:
    assessment = AssessmentResult(**assessment_in.model_dump())
    db.add(assessment)
    db.commit()
    db.refresh(assessment)
    return assessment


# ==========================================
# Student Progress CRUD
# ==========================================

def get_progress(db: Session, progress_id: int) -> Optional[StudentProgress]:
    return db.get(StudentProgress, progress_id)


def get_progress_by_student(
    db: Session,
    student_id: int,
    course_id: Optional[int] = None,
    skip: int = 0,
    limit: int = 100,
) -> List[StudentProgress]:
    stmt = select(StudentProgress).where(StudentProgress.student_id == student_id)
    if course_id:
        stmt = stmt.where(StudentProgress.course_id == course_id)
    stmt = stmt.offset(skip).limit(limit)
    return list(db.scalars(stmt).all())


def create_progress(
    db: Session, progress_in: StudentProgressCreate
) -> StudentProgress:
    progress = StudentProgress(**progress_in.model_dump())
    db.add(progress)
    db.commit()
    db.refresh(progress)
    return progress


def update_progress(
    db: Session, progress_id: int, progress_in: StudentProgressUpdate
) -> Optional[StudentProgress]:
    progress = get_progress(db, progress_id)
    if not progress:
        return None
    update_data = progress_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(progress, field, value)
    db.commit()
    db.refresh(progress)
    return progress


def delete_progress(db: Session, progress_id: int) -> bool:
    progress = get_progress(db, progress_id)
    if not progress:
        return False
    db.delete(progress)
    db.commit()
    return True
