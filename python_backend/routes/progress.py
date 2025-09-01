from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from ..models import ProgressSummary, SubjectProgress, StudySession, UserProfile, APIResponse
from ..database import SupabaseDatabase
from .auth import get_current_user, get_database

router = APIRouter()

@router.get("/summary", response_model=ProgressSummary)
async def get_progress_summary(
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Get comprehensive progress summary for the current user"""
    try:
        # Get user profile with basic stats
        user_profile = await db.get_user_profile(current_user.id)
        if not user_profile:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User profile not found"
            )
        
        # TODO: Implement comprehensive progress calculation
        # For now, return mock data structure
        
        return ProgressSummary(
            user_id=current_user.id,
            total_study_time=int(user_profile.total_study_time),
            total_quizzes=user_profile.total_quizzes,
            average_score=user_profile.average_score,
            current_streak=user_profile.study_streak,
            subjects=[],  # Will be populated with actual data
            recent_sessions=[],  # Will be populated with actual data
            weekly_activity=[]  # Will be populated with actual data
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch progress summary: {str(e)}"
        )

@router.get("/subjects/{subject}", response_model=SubjectProgress)
async def get_subject_progress(
    subject: str,
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Get detailed progress for a specific subject"""
    try:
        progress = await db.get_subject_progress(current_user.id, subject)
        if not progress:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No progress found for this subject"
            )
        return progress
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch subject progress: {str(e)}"
        )

@router.post("/sessions", response_model=APIResponse)
async def record_study_session(
    activity_type: str,
    subject: str,
    duration: int,
    score: float = None,
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Record a study session"""
    try:
        await db.record_study_session(
            current_user.id,
            activity_type,
            subject,
            duration,
            score
        )
        return APIResponse(
            success=True,
            message="Study session recorded successfully"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to record study session: {str(e)}"
        )

@router.get("/analytics", response_model=APIResponse)
async def get_analytics(
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Get detailed analytics and insights"""
    try:
        # TODO: Implement detailed analytics
        # This would include trends, predictions, recommendations, etc.
        
        return APIResponse(
            success=True,
            message="Analytics data retrieved successfully",
            data={
                "trends": [],
                "recommendations": [],
                "insights": []
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch analytics: {str(e)}"
        )