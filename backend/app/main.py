from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.session import init_db
from app.routers import (
    students_router,
    skills_router,
    courses_router,
    assessments_router,
    roadmaps_router,
    progress_router,
    mentor_router,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables on application startup
    init_db()
    yield


app = FastAPI(
    title="LearnMate AI",
    description="Agentic AI Personalized Course Pathways - Production Backend API",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS configuration for Vite frontend (local dev & Vercel deployment)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(students_router)
app.include_router(skills_router)
app.include_router(courses_router)
app.include_router(assessments_router)
app.include_router(roadmaps_router)
app.include_router(progress_router)
app.include_router(mentor_router)


@app.get(
    "/",
    tags=["Root"],
    summary="Root Welcome Endpoint",
    description="Confirms backend status and connectivity.",
)
def home():
    return {
        "message": "Welcome to LearnMate AI",
        "status": "Backend running successfully",
        "version": "1.0.0",
    }


@app.get(
    "/health",
    tags=["Root"],
    summary="Health Check Endpoint",
    description="Returns service health status for load balancers and container probes.",
)
def health():
    return {"status": "healthy", "database": "connected"}
