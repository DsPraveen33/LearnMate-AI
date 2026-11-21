from app.routers.students import router as students_router
from app.routers.skills import router as skills_router
from app.routers.courses import router as courses_router
from app.routers.assessments import router as assessments_router
from app.routers.roadmaps import router as roadmaps_router
from app.routers.progress import router as progress_router
from app.routers.mentor import router as mentor_router

__all__ = [
    "students_router",
    "skills_router",
    "courses_router",
    "assessments_router",
    "roadmaps_router",
    "progress_router",
    "mentor_router",
]
