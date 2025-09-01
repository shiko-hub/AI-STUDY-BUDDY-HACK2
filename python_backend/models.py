from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

# User Models
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    id: str
    email: str
    full_name: Optional[str]
    created_at: datetime
    
class UserProfile(BaseModel):
    id: str
    email: str
    full_name: Optional[str]
    total_quizzes: int = 0
    average_score: float = 0.0
    study_streak: int = 0
    total_study_time: float = 0.0

# Quiz Models
class QuizDifficulty(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

class QuizType(str, Enum):
    MULTIPLE_CHOICE = "multiple_choice"
    TRUE_FALSE = "true_false"
    SHORT_ANSWER = "short_answer"

class QuizQuestion(BaseModel):
    id: Optional[str] = None
    question: str
    options: Optional[List[str]] = None  # For multiple choice
    correct_answer: str
    explanation: Optional[str] = None
    difficulty: QuizDifficulty
    question_type: QuizType

class QuizCreate(BaseModel):
    title: str
    subject: str
    difficulty: QuizDifficulty
    quiz_type: QuizType
    questions: List[QuizQuestion]
    estimated_time: Optional[int] = None  # in minutes

class Quiz(BaseModel):
    id: str
    title: str
    subject: str
    difficulty: QuizDifficulty
    quiz_type: QuizType
    questions: List[QuizQuestion]
    estimated_time: Optional[int]
    created_at: datetime
    user_id: str

# Quiz Attempt Models
class QuizAnswer(BaseModel):
    question_id: str
    user_answer: str
    is_correct: Optional[bool] = None

class QuizAttemptCreate(BaseModel):
    quiz_id: str
    answers: List[QuizAnswer]

class QuizAttempt(BaseModel):
    id: str
    quiz_id: str
    user_id: str
    answers: List[QuizAnswer]
    score: float
    total_questions: int
    correct_answers: int
    time_taken: Optional[int]  # in seconds
    completed_at: datetime

# Flashcard Models
class FlashcardCreate(BaseModel):
    front: str
    back: str
    subject: str
    difficulty: QuizDifficulty
    tags: Optional[List[str]] = []

class Flashcard(BaseModel):
    id: str
    front: str
    back: str
    subject: str
    difficulty: QuizDifficulty
    tags: List[str]
    created_at: datetime
    user_id: str

class FlashcardReview(BaseModel):
    flashcard_id: str
    rating: int  # 1-5 scale (1=hard, 5=easy)
    time_taken: Optional[int]  # in seconds

# Study Guide Models
class StudyGuideCreate(BaseModel):
    title: str
    subject: str
    content: str
    key_topics: List[str]
    objectives: List[str]
    difficulty: QuizDifficulty
    estimated_time: Optional[int]  # in minutes

class StudyGuide(BaseModel):
    id: str
    title: str
    subject: str
    content: str
    key_topics: List[str]
    objectives: List[str]
    difficulty: QuizDifficulty
    estimated_time: Optional[int]
    rating: Optional[float] = None
    created_at: datetime
    updated_at: datetime
    user_id: str

# Progress Models
class SubjectProgress(BaseModel):
    subject: str
    total_quizzes: int
    average_score: float
    best_score: float
    total_time_spent: int  # in minutes
    improvement_rate: float
    last_activity: datetime

class StudySession(BaseModel):
    id: str
    user_id: str
    activity_type: str  # "quiz", "flashcard", "study_guide"
    subject: str
    duration: int  # in minutes
    score: Optional[float] = None
    completed_at: datetime

class ProgressSummary(BaseModel):
    user_id: str
    total_study_time: int  # in minutes
    total_quizzes: int
    average_score: float
    current_streak: int
    subjects: List[SubjectProgress]
    recent_sessions: List[StudySession]
    weekly_activity: List[Dict[str, Any]]

# File Upload Models
class FileUpload(BaseModel):
    filename: str
    content_type: str
    size: int

# API Response Models
class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    expires_in: int
    user: User