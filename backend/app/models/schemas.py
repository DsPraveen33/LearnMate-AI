from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, ConfigDict, EmailStr, Field


# ==========================================
# Student Schemas
# ==========================================

class StudentBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, examples=["Alex Morgan"])
    email: EmailStr = Field(..., examples=["alex.morgan@stanford.edu"])
    title: Optional[str] = Field("Student", max_length=150)
    track: Optional[str] = Field("Agentic AI Systems Architect", max_length=150)
    career_goal: Optional[str] = Field(None, examples=["Principal AI Agent Architect"])
    preferred_learning_style: Optional[str] = Field("Hands-on Labs", max_length=100)
    daily_goal_minutes: Optional[int] = Field(45, ge=1, le=480)
    current_streak: Optional[int] = Field(0, ge=0)
    total_hours: Optional[float] = Field(0.0, ge=0.0)
    level: Optional[int] = Field(1, ge=1)
    xp_points: Optional[int] = Field(0, ge=0)


class StudentCreate(StudentBase):
    pass


class StudentUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    title: Optional[str] = None
    track: Optional[str] = None
    career_goal: Optional[str] = None
    preferred_learning_style: Optional[str] = None
    daily_goal_minutes: Optional[int] = Field(None, ge=1, le=480)
    current_streak: Optional[int] = Field(None, ge=0)
    total_hours: Optional[float] = Field(None, ge=0.0)
    level: Optional[int] = Field(None, ge=1)
    xp_points: Optional[int] = Field(None, ge=0)


class StudentResponse(StudentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# Skill Schemas
# ==========================================

class SkillBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=150, examples=["LangGraph Multi-Agent Loops"])
    category: str = Field(..., min_length=1, max_length=100, examples=["Agentic AI"])
    description: Optional[str] = Field(None, examples=["Cyclical state machine orchestration"])


class SkillCreate(SkillBase):
    pass


class SkillUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=150)
    category: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None


class SkillResponse(SkillBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# Course Schemas
# ==========================================

class CourseBase(BaseModel):
    code: str = Field(..., min_length=1, max_length=50, examples=["AI-301"])
    title: str = Field(..., min_length=1, max_length=255, examples=["Agentic Reasoning with LangGraph"])
    description: str = Field(..., min_length=1, examples=["Master cyclical agent graphs and tool execution."])
    category: str = Field(..., min_length=1, max_length=100, examples=["Agentic AI"])
    level: Optional[str] = Field("Intermediate", max_length=50, examples=["Intermediate"])
    duration_hours: Optional[float] = Field(0.0, ge=0.0)
    rating: Optional[float] = Field(5.0, ge=0.0, le=5.0)
    instructor_name: Optional[str] = Field(None, max_length=150)
    syllabus_json: Optional[str] = None
    is_published: Optional[bool] = True


class CourseCreate(CourseBase):
    pass


class CourseUpdate(BaseModel):
    code: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    level: Optional[str] = None
    duration_hours: Optional[float] = None
    rating: Optional[float] = None
    instructor_name: Optional[str] = None
    syllabus_json: Optional[str] = None
    is_published: Optional[bool] = None


class CourseResponse(CourseBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# Learning Roadmap Schemas
# ==========================================

class LearningRoadmapBase(BaseModel):
    student_id: int
    title: str = Field(..., min_length=1, max_length=255)
    target_role: str = Field(..., min_length=1, max_length=150)
    description: Optional[str] = None
    status: Optional[str] = Field("active", max_length=50)
    stages_json: str = Field(..., description="JSON serialized stages and modules")
    completion_percentage: Optional[float] = Field(0.0, ge=0.0, le=100.0)


class LearningRoadmapCreate(LearningRoadmapBase):
    pass


class LearningRoadmapUpdate(BaseModel):
    title: Optional[str] = None
    target_role: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    stages_json: Optional[str] = None
    completion_percentage: Optional[float] = Field(None, ge=0.0, le=100.0)


class LearningRoadmapResponse(LearningRoadmapBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# Assessment Result Schemas
# ==========================================

class AssessmentResultBase(BaseModel):
    student_id: int
    skill_track: str = Field(..., min_length=1, max_length=100)
    score: float = Field(..., ge=0.0, le=100.0)
    total_questions: Optional[int] = Field(5, ge=1)
    correct_answers: Optional[int] = Field(0, ge=0)
    strengths_json: Optional[str] = None
    improvements_json: Optional[str] = None
    answers_json: Optional[str] = None


class AssessmentResultCreate(AssessmentResultBase):
    pass


class AssessmentResultResponse(AssessmentResultBase):
    id: int
    taken_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# Student Progress Schemas
# ==========================================

class StudentProgressBase(BaseModel):
    student_id: int
    course_id: Optional[int] = None
    task_id: Optional[str] = None
    task_title: Optional[str] = None
    status: Optional[str] = Field("in_progress", max_length=50)
    progress_percentage: Optional[float] = Field(0.0, ge=0.0, le=100.0)
    time_spent_minutes: Optional[int] = Field(0, ge=0)
    completed_at: Optional[datetime] = None


class StudentProgressCreate(StudentProgressBase):
    pass


class StudentProgressUpdate(BaseModel):
    status: Optional[str] = None
    progress_percentage: Optional[float] = Field(None, ge=0.0, le=100.0)
    time_spent_minutes: Optional[int] = Field(None, ge=0)
    completed_at: Optional[datetime] = None


class StudentProgressResponse(StudentProgressBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
