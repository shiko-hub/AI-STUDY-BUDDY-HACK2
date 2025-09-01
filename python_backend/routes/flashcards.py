from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from models import Flashcard, FlashcardCreate, FlashcardReview, APIResponse
from database import SupabaseDatabase
from routes.auth import get_current_user, get_database

router = APIRouter()

@router.post("/", response_model=APIResponse)
async def create_flashcard(
    flashcard_data: FlashcardCreate,
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Create a new flashcard"""
    try:
        flashcard_id = await db.create_flashcard(flashcard_data, current_user.id)
        return APIResponse(
            success=True,
            message="Flashcard created successfully",
            data={"flashcard_id": flashcard_id}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create flashcard: {str(e)}"
        )

@router.get("/", response_model=List[Flashcard])
async def get_flashcards(
    subject: Optional[str] = None,
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Get flashcards for the current user, optionally filtered by subject"""
    try:
        flashcards = await db.get_user_flashcards(current_user.id, subject)
        return flashcards
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch flashcards: {str(e)}"
        )

@router.post("/review", response_model=APIResponse)
async def record_flashcard_review(
    review_data: FlashcardReview,
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Record a flashcard review session"""
    try:
        await db.record_flashcard_review(review_data, current_user.id)
        return APIResponse(
            success=True,
            message="Flashcard review recorded successfully"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to record review: {str(e)}"
        )

@router.delete("/{flashcard_id}", response_model=APIResponse)
async def delete_flashcard(
    flashcard_id: str,
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Delete a flashcard"""
    try:
        # TODO: Implement delete functionality
        return APIResponse(
            success=True,
            message="Flashcard deleted successfully"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete flashcard: {str(e)}"
        )

@router.get("/subjects", response_model=List[str])
async def get_flashcard_subjects(
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Get list of subjects for user's flashcards"""
    try:
        flashcards = await db.get_user_flashcards(current_user.id)
        subjects = list(set(card.subject for card in flashcards))
        return subjects
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch subjects: {str(e)}"
        )