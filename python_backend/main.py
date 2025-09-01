from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional, List
import os
from dotenv import load_dotenv
from supabase import create_client, Client
import uvicorn

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="AI Quiz & Study Assistant API", version="1.0.0")

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_ANON_KEY")

if not supabase_url or not supabase_key:
    raise Exception("Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables")

supabase: Client = create_client(supabase_url, supabase_key)

# Security
security = HTTPBearer()

# Import routes
from python_backend.routes import auth, quizzes, flashcards, progress, study_guides

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(quizzes.router, prefix="/api/quizzes", tags=["quizzes"])
app.include_router(flashcards.router, prefix="/api/flashcards", tags=["flashcards"])
app.include_router(progress.router, prefix="/api/progress", tags=["progress"])
app.include_router(study_guides.router, prefix="/api/study-guides", tags=["study-guides"])

@app.get("/")
async def root():
    return {"message": "AI Quiz & Study Assistant API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "AI Quiz & Study Assistant API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)