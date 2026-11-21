import json
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field, StringConstraints, model_validator

from app.models.schemas import LearningRoadmapCreate

Title = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=150)]
Description = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=800)]


class RoadmapGenerateRequest(BaseModel):
    student_id: int = Field(gt=0)
    learning_goal: Description
    skills: list[Title] = Field(default_factory=list, max_length=20)


class RoadmapModule(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)

    title: Title
    description: Description
    duration_minutes: int = Field(ge=5, le=600)
    type: Literal["video", "lab", "quiz", "project"]


class RoadmapMilestone(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)

    sequence: int = Field(ge=1, le=5)
    title: Title
    description: Description
    skills: list[Title] = Field(min_length=1, max_length=6)
    estimated_weeks: int = Field(ge=1, le=24)
    modules: list[RoadmapModule] = Field(min_length=1, max_length=4)


class GraniteRoadmap(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)

    title: Title
    target_role: Title
    description: Description
    milestones: list[RoadmapMilestone] = Field(min_length=1, max_length=5)

    @model_validator(mode="after")
    def validate_sequence(self):
        for expected, milestone in enumerate(self.milestones, start=1):
            if milestone.sequence != expected:
                raise ValueError("Milestone sequences must start at one and be consecutive.")
        return self

    def as_save_payload(self, student_id: int) -> LearningRoadmapCreate:
        return LearningRoadmapCreate(
            student_id=student_id,
            title=self.title,
            target_role=self.target_role,
            description=self.description,
            stages_json=json.dumps([
                {
                    "id": f"stage-{stage.sequence}",
                    "stageNumber": stage.sequence,
                    "title": stage.title,
                    "subtitle": stage.description,
                    "skills": stage.skills,
                    "status": "in_progress" if stage.sequence == 1 else "locked",
                    "completionPercentage": 0,
                    "estimatedWeeks": stage.estimated_weeks,
                    "modules": [
                        {
                            "id": f"stage-{stage.sequence}-module-{index}",
                            "title": module.title,
                            "description": module.description,
                            "duration": f"{module.duration_minutes} min",
                            "type": module.type,
                            "completed": False,
                            "locked": stage.sequence > 1,
                        }
                        for index, module in enumerate(stage.modules, start=1)
                    ],
                }
                for stage in self.milestones
            ]),
        )


class RoadmapDraft(BaseModel):
    milestones: list[RoadmapMilestone]
    save_payload: LearningRoadmapCreate
