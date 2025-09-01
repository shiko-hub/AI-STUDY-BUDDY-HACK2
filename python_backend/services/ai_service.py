import os
import json
from typing import List, Dict, Any, Optional
from openai import OpenAI
import PyPDF2
from io import BytesIO
from models import QuizQuestion, QuizDifficulty, QuizType

class AIService:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
    def extract_text_from_pdf(self, pdf_content: bytes) -> str:
        """Extract text content from PDF file"""
        try:
            pdf_file = BytesIO(pdf_content)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            
            return text.strip()
        except Exception as e:
            raise Exception(f"Failed to extract text from PDF: {str(e)}")
    
    async def generate_quiz_questions(
        self, 
        content: str, 
        subject: str,
        difficulty: str = "medium",
        quiz_type: str = "multiple_choice",
        num_questions: int = 10
    ) -> List[QuizQuestion]:
        """Generate quiz questions from content using AI"""
        try:
            # Create a detailed prompt for quiz generation
            prompt = self._create_quiz_prompt(content, subject, difficulty, quiz_type, num_questions)
            
            # the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
            response = self.client.chat.completions.create(
                model="gpt-5",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert educational content creator. Generate high-quality quiz questions based on the provided content. Always respond with valid JSON in the exact format requested."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                response_format={"type": "json_object"},
                temperature=0.7
            )
            
            # Parse the response
            result = json.loads(response.choices[0].message.content)
            
            # Convert to QuizQuestion objects
            questions = []
            for q_data in result.get("questions", []):
                question = QuizQuestion(
                    question=q_data["question"],
                    options=q_data.get("options", []),
                    correct_answer=q_data["correct_answer"],
                    explanation=q_data.get("explanation", ""),
                    difficulty=QuizDifficulty(difficulty.lower()),
                    question_type=QuizType(quiz_type)
                )
                questions.append(question)
            
            return questions
            
        except Exception as e:
            raise Exception(f"Failed to generate quiz questions: {str(e)}")
    
    def _create_quiz_prompt(
        self, 
        content: str, 
        subject: str, 
        difficulty: str, 
        quiz_type: str, 
        num_questions: int
    ) -> str:
        """Create a detailed prompt for quiz generation"""
        
        if quiz_type == "multiple_choice":
            format_instructions = """
            For each question, provide:
            - question: The question text
            - options: Array of 4 possible answers (A, B, C, D)
            - correct_answer: The letter of the correct option (A, B, C, or D)
            - explanation: Brief explanation of why the answer is correct
            """
        elif quiz_type == "true_false":
            format_instructions = """
            For each question, provide:
            - question: The question text (should be answerable with true/false)
            - options: ["True", "False"]
            - correct_answer: Either "True" or "False"
            - explanation: Brief explanation of why the answer is correct
            """
        else:  # short_answer
            format_instructions = """
            For each question, provide:
            - question: The question text
            - options: null (not needed for short answers)
            - correct_answer: The expected answer
            - explanation: Brief explanation or key points for the answer
            """
        
        return f"""
        Based on the following content about {subject}, create {num_questions} {difficulty} level {quiz_type.replace('_', ' ')} questions.

        Content:
        {content[:4000]}  # Limit content to avoid token limits

        Requirements:
        - Questions should be {difficulty} difficulty level
        - Focus on key concepts and important details
        - Ensure questions test understanding, not just memorization
        - Make questions clear and unambiguous
        
        {format_instructions}

        Respond with JSON in this exact format:
        {{
            "questions": [
                {{
                    "question": "Question text here?",
                    "options": ["A", "B", "C", "D"] or ["True", "False"] or null,
                    "correct_answer": "A" or "True" or "Expected answer",
                    "explanation": "Explanation of the correct answer"
                }}
            ]
        }}
        """
    
    async def generate_motivation_message(
        self, 
        user_name: Optional[str] = None,
        recent_performance: Optional[Dict[str, Any]] = None,
        study_streak: int = 0,
        preferred_tone: str = "encouraging"
    ) -> str:
        """Generate personalized motivational message"""
        try:
            prompt = self._create_motivation_prompt(user_name, recent_performance, study_streak, preferred_tone)
            
            # the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
            response = self.client.chat.completions.create(
                model="gpt-5",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a supportive and knowledgeable study coach. Create personalized, motivating messages that encourage learning and celebrate progress. Keep messages concise (2-3 sentences) and genuinely inspiring."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.8,
                max_tokens=150
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            # Fallback to generic messages if AI fails
            fallback_messages = [
                "Keep up the great work! Every study session brings you closer to your goals.",
                "You're making excellent progress! Consistency is the key to success.",
                "Learning is a journey, and you're doing amazingly well on yours!",
                "Your dedication to studying is truly inspiring. Keep pushing forward!"
            ]
            import random
            return random.choice(fallback_messages)
    
    def _create_motivation_prompt(
        self,
        user_name: Optional[str],
        recent_performance: Optional[Dict[str, Any]],
        study_streak: int,
        preferred_tone: str
    ) -> str:
        """Create prompt for motivation message generation"""
        
        name_part = f"for {user_name}" if user_name else "for this student"
        
        performance_context = ""
        if recent_performance:
            avg_score = recent_performance.get("average_score", 0)
            recent_quizzes = recent_performance.get("recent_quizzes", 0)
            improvement = recent_performance.get("improvement", 0)
            
            if avg_score > 0:
                performance_context = f"""
                Recent performance:
                - Average quiz score: {avg_score}%
                - Quizzes completed recently: {recent_quizzes}
                - Performance trend: {'+' if improvement > 0 else ''}{improvement}%
                """
        
        streak_context = f"Current study streak: {study_streak} days" if study_streak > 0 else "Just starting their study journey"
        
        return f"""
        Create a personalized, {preferred_tone} motivational message {name_part}.
        
        Context:
        {streak_context}
        {performance_context}
        
        The message should:
        - Be genuine and specific to their situation
        - Acknowledge their progress or effort
        - Provide encouragement for continued learning
        - Be 2-3 sentences maximum
        - Have a {preferred_tone} tone
        
        Focus on growth mindset and celebrate their learning journey.
        """

# Create a singleton instance
ai_service = AIService()