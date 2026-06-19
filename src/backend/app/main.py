from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import ai, search, health

app = FastAPI(
    title="Nova Horizon API",
    description="AI Travel OS — API для поиска туров, авиабилетов и отелей",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://novahorizon.ru", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["health"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["AI"])
app.include_router(search.router, prefix="/api/v1/search", tags=["search"])
