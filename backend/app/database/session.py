import os
from collections.abc import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./learnmate.db")

# check_same_thread is only needed for SQLite
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    echo=False,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency to yield a database session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db(seed: bool = True) -> None:
    """Initializes tables in the database and seeds defaults if requested."""
    # Import all models to ensure they are registered with Base.metadata
    from app.models import db_models  # noqa: F401

    Base.metadata.create_all(bind=engine)

    if seed:
        from app.database.seed import seed_database
        db = SessionLocal()
        try:
            seed_database(db)
        finally:
            db.close()
