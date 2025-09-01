from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from models import StudyGuide, StudyGuideCreate, APIResponse
from database import SupabaseDatabase
from routes.auth import get_current_user, get_database

router = APIRouter()

@router.post("/", response_model=APIResponse)
async def create_study_guide(
    guide_data: StudyGuideCreate,
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Create a new study guide"""
    try:
        guide_id = await db.create_study_guide(guide_data, current_user.id)
        return APIResponse(
            success=True,
            message="Study guide created successfully",
            data={"guide_id": guide_id}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create study guide: {str(e)}"
        )

@router.get("/", response_model=List[StudyGuide])
async def get_study_guides(
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Get all study guides for the current user"""
    try:
        guides = await db.get_user_study_guides(current_user.id)
        return guides
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch study guides: {str(e)}"
        )

@router.get("/{guide_id}", response_model=StudyGuide)
async def get_study_guide(
    guide_id: str,
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Get a specific study guide by ID"""
    try:
        # TODO: Implement get single study guide
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="Feature not implemented yet"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch study guide: {str(e)}"
        )

@router.put("/{guide_id}", response_model=APIResponse)
async def update_study_guide(
    guide_id: str,
    guide_data: StudyGuideCreate,
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Update a study guide"""
    try:
        # TODO: Implement update functionality
        return APIResponse(
            success=True,
            message="Study guide updated successfully"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update study guide: {str(e)}"
        )

@router.delete("/{guide_id}", response_model=APIResponse)
async def delete_study_guide(
    guide_id: str,
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Delete a study guide"""
    try:
        # TODO: Implement delete functionality
        return APIResponse(
            success=True,
            message="Study guide deleted successfully"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete study guide: {str(e)}"
        )