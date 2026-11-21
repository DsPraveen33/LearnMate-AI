from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    Text,
    DateTime,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from app.database.session import Base


def utc_now():
    return datetime.now(timezone.utc)


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(150), default="Student")
    track = Column(String(150), default="Agentic AI Systems Architect")
    career_goal = Column(Text, nullable=True)
    preferred_learning_style = Column(String(100), default="Hands-on Labs")
    daily_goal_minutes = Column(Integer, default=45)
    current_streak = Column(Integer, default=0)
    total_hours = Column(Float, default=0.0)
    level = Column(Integer, default=1)
    xp_points = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    # Relationships
    progress_records = relationship(
        "StudentProgress", back_populates="student", cascade="all, delete-orphan"
    )
    assessment_results = relationship(
        "AssessmentResult", back_populates="student", cascade="all, delete-orphan"
    )
    roadmaps = relationship(
        "LearningRoadmap", back_populates="student", cascade="all, delete-orphan"
    )


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(150), unique=True, index=True, nullable=False)
    category = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    code = Column(String(50), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(100), nullable=False)
    level = Column(String(50), default="Intermediate")
    duration_hours = Column(Float, default=0.0)
    rating = Column(Float, default=5.0)
    instructor_name = Column(String(150), nullable=True)
    syllabus_json = Column(Text, nullable=True)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    # Relationships
    progress_records = relationship("StudentProgress", back_populates="course")


class LearningRoadmap(Base):
    __tablename__ = "learning_roadmaps"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    student_id = Column(
        Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False
    )
    title = Column(String(255), nullable=False)
    target_role = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(50), default="active")  # active, completed, archived
    stages_json = Column(Text, nullable=False)  # JSON serialized stages
    completion_percentage = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    # Relationships
    student = relationship("Student", back_populates="roadmaps")


class AssessmentResult(Base):
    __tablename__ = "assessment_results"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    student_id = Column(
        Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False
    )
    skill_track = Column(String(100), nullable=False)
    score = Column(Float, nullable=False)
    total_questions = Column(Integer, default=5)
    correct_answers = Column(Integer, default=0)
    strengths_json = Column(Text, nullable=True)  # JSON serialized list
    improvements_json = Column(Text, nullable=True)  # JSON serialized list
    answers_json = Column(Text, nullable=True)  # JSON serialized user answers
    taken_at = Column(DateTime(timezone=True), default=utc_now)

    # Relationships
    student = relationship("Student", back_populates="assessment_results")


class StudentProgress(Base):
    __tablename__ = "student_progress"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    student_id = Column(
        Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False
    )
    course_id = Column(
        Integer, ForeignKey("courses.id", ondelete="SET NULL"), nullable=True
    )
    task_id = Column(String(100), nullable=True)
    task_title = Column(String(255), nullable=True)
    status = Column(String(50), default="in_progress")  # in_progress, completed
    progress_percentage = Column(Float, default=0.0)
    time_spent_minutes = Column(Integer, default=0)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    # Relationships
    student = relationship("Student", back_populates="progress_records")
    course = relationship("Course", back_populates="progress_records")
