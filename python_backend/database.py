from supabase import Client
from typing import Optional, List, Dict, Any
from models import *
import json
from datetime import datetime

class SupabaseDatabase:
    def __init__(self, supabase_client: Client):
        self.client = supabase_client
    
    # User operations
    async def create_user_profile(self, user_id: str, email: str, full_name: Optional[str] = None):
        """Create user profile in profiles table"""
        data = {
            "id": user_id,
            "email": email,
            "full_name": full_name,
            "total_quizzes": 0,
            "average_score": 0.0,
            "study_streak": 0,
            "total_study_time": 0.0
        }
        result = self.client.table("profiles").insert(data).execute()
        return result.data[0] if result.data else None
    
    async def get_user_profile(self, user_id: str) -> Optional[UserProfile]:
        """Get user profile by ID"""
        result = self.client.table("profiles").select("*").eq("id", user_id).execute()
        if result.data:
            return UserProfile(**result.data[0])
        return None
    
    async def update_user_stats(self, user_id: str, quiz_score: float, time_taken: int):
        """Update user statistics after quiz completion"""
        profile = await self.get_user_profile(user_id)
        if profile:
            new_total = profile.total_quizzes + 1
            new_avg = ((profile.average_score * profile.total_quizzes) + quiz_score) / new_total
            new_study_time = profile.total_study_time + (time_taken / 60)  # Convert to minutes
            
            update_data = {
                "total_quizzes": new_total,
                "average_score": round(new_avg, 2),
                "total_study_time": round(new_study_time, 2)
            }
            
            self.client.table("profiles").update(update_data).eq("id", user_id).execute()
    
    # Quiz operations
    async def create_quiz(self, quiz_data: QuizCreate, user_id: str) -> str:
        """Create a new quiz"""
        data = {
            "title": quiz_data.title,
            "subject": quiz_data.subject,
            "difficulty": quiz_data.difficulty.value,
            "quiz_type": quiz_data.quiz_type.value,
            "questions": [q.dict() for q in quiz_data.questions],
            "estimated_time": quiz_data.estimated_time,
            "user_id": user_id
        }
        result = self.client.table("quizzes").insert(data).execute()
        return result.data[0]["id"] if result.data else None
    
    async def get_quiz(self, quiz_id: str) -> Optional[Quiz]:
        """Get quiz by ID"""
        result = self.client.table("quizzes").select("*").eq("id", quiz_id).execute()
        if result.data:
            quiz_data = result.data[0]
            quiz_data["questions"] = [QuizQuestion(**q) for q in quiz_data["questions"]]
            return Quiz(**quiz_data)
        return None
    
    async def get_user_quizzes(self, user_id: str) -> List[Quiz]:
        """Get all quizzes for a user"""
        result = self.client.table("quizzes").select("*").eq("user_id", user_id).execute()
        quizzes = []
        for quiz_data in result.data:
            quiz_data["questions"] = [QuizQuestion(**q) for q in quiz_data["questions"]]
            quizzes.append(Quiz(**quiz_data))
        return quizzes
    
    # Quiz attempt operations
    async def create_quiz_attempt(self, attempt_data: QuizAttemptCreate, user_id: str) -> str:
        """Record a quiz attempt"""
        # Calculate score
        correct_count = sum(1 for answer in attempt_data.answers if answer.is_correct)
        total_questions = len(attempt_data.answers)
        score = (correct_count / total_questions) * 100 if total_questions > 0 else 0
        
        data = {
            "quiz_id": attempt_data.quiz_id,
            "user_id": user_id,
            "answers": [a.dict() for a in attempt_data.answers],
            "score": score,
            "total_questions": total_questions,
            "correct_answers": correct_count
        }
        result = self.client.table("quiz_attempts").insert(data).execute()
        return result.data[0]["id"] if result.data else None
    
    async def get_user_quiz_attempts(self, user_id: str) -> List[QuizAttempt]:
        """Get all quiz attempts for a user"""
        result = self.client.table("quiz_attempts").select("*").eq("user_id", user_id).execute()
        attempts = []
        for attempt_data in result.data:
            attempt_data["answers"] = [QuizAnswer(**a) for a in attempt_data["answers"]]
            attempts.append(QuizAttempt(**attempt_data))
        return attempts
    
    # Flashcard operations
    async def create_flashcard(self, flashcard_data: FlashcardCreate, user_id: str) -> str:
        """Create a new flashcard"""
        data = {
            "front": flashcard_data.front,
            "back": flashcard_data.back,
            "subject": flashcard_data.subject,
            "difficulty": flashcard_data.difficulty.value,
            "tags": flashcard_data.tags,
            "user_id": user_id
        }
        result = self.client.table("flashcards").insert(data).execute()
        return result.data[0]["id"] if result.data else None
    
    async def get_user_flashcards(self, user_id: str, subject: Optional[str] = None) -> List[Flashcard]:
        """Get flashcards for a user, optionally filtered by subject"""
        query = self.client.table("flashcards").select("*").eq("user_id", user_id)
        if subject:
            query = query.eq("subject", subject)
        
        result = query.execute()
        return [Flashcard(**card) for card in result.data]
    
    async def record_flashcard_review(self, review_data: FlashcardReview, user_id: str):
        """Record a flashcard review session"""
        data = {
            "flashcard_id": review_data.flashcard_id,
            "user_id": user_id,
            "rating": review_data.rating,
            "time_taken": review_data.time_taken
        }
        self.client.table("flashcard_reviews").insert(data).execute()
    
    # Study guide operations
    async def create_study_guide(self, guide_data: StudyGuideCreate, user_id: str) -> str:
        """Create a new study guide"""
        data = {
            "title": guide_data.title,
            "subject": guide_data.subject,
            "content": guide_data.content,
            "key_topics": guide_data.key_topics,
            "objectives": guide_data.objectives,
            "difficulty": guide_data.difficulty.value,
            "estimated_time": guide_data.estimated_time,
            "user_id": user_id
        }
        result = self.client.table("study_guides").insert(data).execute()
        return result.data[0]["id"] if result.data else None
    
    async def get_user_study_guides(self, user_id: str) -> List[StudyGuide]:
        """Get study guides for a user"""
        result = self.client.table("study_guides").select("*").eq("user_id", user_id).execute()
        return [StudyGuide(**guide) for guide in result.data]
    
    # Progress tracking
    async def get_subject_progress(self, user_id: str, subject: str) -> Optional[SubjectProgress]:
        """Get progress for a specific subject"""
        # Get quiz attempts for this subject
        attempts_result = self.client.table("quiz_attempts").select("""
            *, quizzes!inner(subject)
        """).eq("user_id", user_id).eq("quizzes.subject", subject).execute()
        
        if not attempts_result.data:
            return None
        
        attempts = attempts_result.data
        total_quizzes = len(attempts)
        scores = [attempt["score"] for attempt in attempts]
        average_score = sum(scores) / len(scores) if scores else 0
        best_score = max(scores) if scores else 0
        
        # Calculate other metrics...
        return SubjectProgress(
            subject=subject,
            total_quizzes=total_quizzes,
            average_score=round(average_score, 2),
            best_score=best_score,
            total_time_spent=0,  # Calculate from session data
            improvement_rate=0.0,  # Calculate trend
            last_activity=datetime.now()  # Get from latest attempt
        )
    
    async def record_study_session(self, user_id: str, activity_type: str, subject: str, duration: int, score: Optional[float] = None):
        """Record a study session"""
        data = {
            "user_id": user_id,
            "activity_type": activity_type,
            "subject": subject,
            "duration": duration,
            "score": score
        }
        self.client.table("study_sessions").insert(data).execute()