from fastapi import APIRouter, HTTPException, Depends, status
from typing import Optional
from models import APIResponse, UserProfile
from database import SupabaseDatabase
from routes.auth import get_current_user, get_database

router = APIRouter()

@router.post("/motivation", response_model=APIResponse)
async def get_motivation_message(
    preferred_tone: str = "encouraging",
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Generate personalized motivational message using AI"""
    try:
        # Get user profile for personalization
        user_profile = await db.get_user_profile(current_user.id)
        
        # Get recent quiz attempts for performance context
        recent_attempts = await db.get_user_quiz_attempts(current_user.id)
        recent_performance = None
        
        if recent_attempts:
            # Calculate recent performance metrics
            recent_scores = [attempt.score for attempt in recent_attempts[-5:]]  # Last 5 attempts
            avg_score = sum(recent_scores) / len(recent_scores) if recent_scores else 0
            
            # Calculate improvement trend
            improvement = 0
            if len(recent_scores) >= 2:
                first_half = recent_scores[:len(recent_scores)//2]
                second_half = recent_scores[len(recent_scores)//2:]
                if first_half and second_half:
                    improvement = (sum(second_half)/len(second_half)) - (sum(first_half)/len(first_half))
            
            recent_performance = {
                "average_score": round(avg_score, 1),
                "recent_quizzes": len(recent_attempts),
                "improvement": round(improvement, 1)
            }
        
        # Import AI service
        from services.ai_service import ai_service
        
        # Generate motivation message
        motivation_message = await ai_service.generate_motivation_message(
            user_name=user_profile.full_name if user_profile else None,
            recent_performance=recent_performance,
            study_streak=user_profile.study_streak if user_profile else 0,
            preferred_tone=preferred_tone
        )
        
        return APIResponse(
            success=True,
            message="Motivation message generated successfully",
            data={
                "motivation_message": motivation_message,
                "user_context": {
                    "study_streak": user_profile.study_streak if user_profile else 0,
                    "total_quizzes": user_profile.total_quizzes if user_profile else 0,
                    "average_score": user_profile.average_score if user_profile else 0
                }
            }
        )
        
    except Exception as e:
        # Return fallback message if AI fails
        fallback_messages = [
            "Keep up the excellent work! Every study session is a step closer to your goals.",
            "You're making great progress! Consistency and dedication will lead you to success.",
            "Learning is a journey, and you're doing wonderfully. Keep pushing forward!",
            "Your commitment to studying is inspiring. You've got this!"
        ]
        import random
        
        return APIResponse(
            success=True,
            message="Motivation message generated (fallback)",
            data={
                "motivation_message": random.choice(fallback_messages),
                "user_context": {
                    "study_streak": 0,
                    "total_quizzes": 0,
                    "average_score": 0
                }
            }
        )

@router.post("/study-tips", response_model=APIResponse)
async def get_study_tips(
    subject: str,
    difficulty_level: str = "medium",
    learning_style: str = "visual",
    current_user = Depends(get_current_user)
):
    """Generate personalized study tips for a subject"""
    try:
        from services.ai_service import ai_service
        
        # Create prompt for study tips
        prompt = f"""
        Generate 3-5 specific, actionable study tips for {subject} at {difficulty_level} level.
        The student prefers {learning_style} learning style.
        
        Focus on:
        - Practical techniques they can use immediately
        - Subject-specific strategies
        - Ways to improve retention and understanding
        - Tips tailored to their learning style
        
        Keep each tip concise but detailed enough to be actionable.
        """
        
        response = ai_service.client.chat.completions.create(
            model="gpt-5",  # the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert study coach. Provide practical, actionable study tips tailored to the student's needs."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            max_tokens=400
        )
        
        study_tips = response.choices[0].message.content.strip()
        
        return APIResponse(
            success=True,
            message="Study tips generated successfully",
            data={
                "study_tips": study_tips,
                "subject": subject,
                "difficulty_level": difficulty_level,
                "learning_style": learning_style
            }
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate study tips: {str(e)}"
        )