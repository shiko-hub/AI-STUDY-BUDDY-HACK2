from fastapi import APIRouter, HTTPException, Depends, status, UploadFile, File
from typing import List, Optional
from models import Quiz, QuizCreate, QuizAttempt, QuizAttemptCreate, APIResponse, QuizDifficulty, QuizType
from database import SupabaseDatabase
from routes.auth import get_current_user, get_database

router = APIRouter()

@router.post("/", response_model=APIResponse)
async def create_quiz(
    quiz_data: QuizCreate,
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Create a new quiz"""
    try:
        quiz_id = await db.create_quiz(quiz_data, current_user.id)
        return APIResponse(
            success=True,
            message="Quiz created successfully",
            data={"quiz_id": quiz_id}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create quiz: {str(e)}"
        )

@router.get("/", response_model=List[Quiz])
async def get_user_quizzes(
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Get all quizzes for the current user"""
    try:
        quizzes = await db.get_user_quizzes(current_user.id)
        return quizzes
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch quizzes: {str(e)}"
        )

@router.get("/{quiz_id}", response_model=Quiz)
async def get_quiz(
    quiz_id: str,
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Get a specific quiz by ID"""
    try:
        quiz = await db.get_quiz(quiz_id)
        if not quiz:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Quiz not found"
            )
        
        # Check if user owns this quiz or it's public
        if quiz.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        return quiz
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch quiz: {str(e)}"
        )

@router.post("/{quiz_id}/attempts", response_model=APIResponse)
async def submit_quiz_attempt(
    quiz_id: str,
    attempt_data: QuizAttemptCreate,
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Submit a quiz attempt"""
    try:
        # Verify quiz exists and user has access
        quiz = await db.get_quiz(quiz_id)
        if not quiz:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Quiz not found"
            )
        
        # Grade the answers
        for i, answer in enumerate(attempt_data.answers):
            correct_answer = quiz.questions[i].correct_answer
            answer.is_correct = answer.user_answer.lower().strip() == correct_answer.lower().strip()
        
        # Record the attempt
        attempt_id = await db.create_quiz_attempt(attempt_data, current_user.id)
        
        # Update user statistics
        correct_count = sum(1 for answer in attempt_data.answers if answer.is_correct)
        score = (correct_count / len(attempt_data.answers)) * 100
        await db.update_user_stats(current_user.id, score, 0)  # TODO: track time_taken
        
        return APIResponse(
            success=True,
            message="Quiz attempt submitted successfully",
            data={
                "attempt_id": attempt_id,
                "score": score,
                "correct_answers": correct_count,
                "total_questions": len(attempt_data.answers)
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit quiz attempt: {str(e)}"
        )

@router.get("/attempts/history", response_model=List[QuizAttempt])
async def get_quiz_attempts(
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Get quiz attempt history for the current user"""
    try:
        attempts = await db.get_user_quiz_attempts(current_user.id)
        return attempts
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch quiz attempts: {str(e)}"
        )

@router.post("/generate-from-pdf", response_model=APIResponse)
async def generate_quiz_from_pdf(
    file: UploadFile = File(...),
    subject: str = "General",
    difficulty: str = "medium",
    quiz_type: str = "multiple_choice",
    num_questions: int = 10,
    current_user = Depends(get_current_user),
    db: SupabaseDatabase = Depends(get_database)
):
    """Generate a quiz from uploaded PDF using AI"""
    try:
        # Validate file type
        if file.content_type != "application/pdf":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only PDF files are supported"
            )
        
        # Validate file size (limit to 10MB)
        max_size = 10 * 1024 * 1024  # 10MB
        if file.size and file.size > max_size:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File size must be less than 10MB"
            )
        
        # Read file content
        content = await file.read()
        
        # Import AI service here to avoid circular imports
        from services.ai_service import ai_service
        
        # Extract text from PDF
        extracted_text = ai_service.extract_text_from_pdf(content)
        
        if not extracted_text.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not extract text from PDF. Please ensure the PDF contains readable text."
            )
        
        # Generate quiz questions using AI
        questions = await ai_service.generate_quiz_questions(
            content=extracted_text,
            subject=subject,
            difficulty=difficulty,
            quiz_type=quiz_type,
            num_questions=num_questions
        )
        
        if not questions:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to generate questions from the content"
            )
        
        # Create quiz data
        quiz_data = QuizCreate(
            title=f"Quiz from {file.filename}",
            subject=subject,
            difficulty=difficulty,
            quiz_type=quiz_type,
            questions=questions,
            estimated_time=num_questions * 2  # 2 minutes per question
        )
        
        # Save quiz to database
        quiz_id = await db.create_quiz(quiz_data, current_user.id)
        
        return APIResponse(
            success=True,
            message="Quiz generated successfully from PDF!",
            data={
                "quiz_id": quiz_id,
                "title": quiz_data.title,
                "questions_generated": len(questions),
                "estimated_time": quiz_data.estimated_time,
                "difficulty": difficulty,
                "subject": subject
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process PDF and generate quiz: {str(e)}"
        )