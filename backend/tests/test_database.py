import pytest
from app.models.db_models import Student, Skill, Course, LearningRoadmap, AssessmentResult, StudentProgress
from app.models.schemas import StudentCreate, SkillCreate, CourseCreate
from app.services import crud


def test_create_and_query_student(db_session):
    student_in = StudentCreate(
        name="Alex Morgan",
        email="alex.morgan@stanford.edu",
        track="Agentic AI Systems Architect",
        career_goal="Staff AI Architect",
        daily_goal_minutes=45,
    )
    student = crud.create_student(db_session, student_in)
    assert student.id is not None
    assert student.name == "Alex Morgan"
    assert student.level == 1

    queried = crud.get_student_by_email(db_session, "alex.morgan@stanford.edu")
    assert queried is not None
    assert queried.id == student.id


def test_create_and_query_skill(db_session):
    skill_in = SkillCreate(
        name="LangGraph StateGraph",
        category="Agentic AI",
        description="Stateful cyclical agent workflows",
    )
    skill = crud.create_skill(db_session, skill_in)
    assert skill.id is not None
    assert skill.name == "LangGraph StateGraph"

    queried = crud.get_skill_by_name(db_session, "LangGraph StateGraph")
    assert queried is not None
    assert queried.category == "Agentic AI"


def test_create_and_query_course(db_session):
    course_in = CourseCreate(
        code="AI-301",
        title="Agentic Reasoning with LangGraph",
        description="Deep dive into multi-agent loops and tool schemas.",
        category="Agentic AI",
        level="Intermediate",
        duration_hours=8.5,
        rating=4.95,
        instructor_name="Dr. Elena Rostova",
    )
    course = crud.create_course(db_session, course_in)
    assert course.id is not None
    assert course.code == "AI-301"

    queried = crud.get_course_by_code(db_session, "AI-301")
    assert queried is not None
    assert queried.title == "Agentic Reasoning with LangGraph"
