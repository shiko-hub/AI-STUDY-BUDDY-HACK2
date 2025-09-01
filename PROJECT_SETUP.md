# DocuTutor - AI Quiz & Study Assistant

A full-stack application with React frontend and Python FastAPI backend for AI-powered quiz generation and study assistance.

## Project Structure

```
DocuTutor/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Main pages (QuizGeneration, Dashboard, etc.)
│   │   ├── components/    # Reusable UI components
│   │   └── ...
├── python_backend/        # Python FastAPI backend
│   ├── routes/           # API route handlers
│   ├── services/         # Business logic (AI service)
│   ├── models.py         # Data models
│   ├── database.py       # Database operations
│   └── main.py          # FastAPI app entry point
├── start_backend.sh      # Backend startup script
└── package.json         # Frontend dependencies
```

## Required Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI API Key (required for AI features)
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration (if using database)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## API Endpoints

The Python backend runs on port 8000 and provides these endpoints:

### AI Features
- `POST /api/ai/motivation` - Get personalized motivation messages
- `POST /api/ai/study-tips` - Get study tips for specific subjects

### Quiz Management
- `POST /api/quizzes/generate-from-pdf` - Generate quiz from uploaded PDF
- `GET /api/quizzes/` - Get user's quizzes
- `POST /api/quizzes/` - Create new quiz
- `POST /api/quizzes/{quiz_id}/attempt` - Submit quiz attempt

### User Management
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

## Setup Instructions

### 1. Install Dependencies

**Frontend (React):**
```bash
npm install
```

**Backend (Python):**
```bash
# Python dependencies are managed by Replit automatically
# Key packages: fastapi, uvicorn, openai, supabase, pydantic
```

### 2. Environment Setup

1. Add your OpenAI API key to the Replit Secrets:
   - Go to Secrets tab in Replit
   - Add `OPENAI_API_KEY` with your API key

2. (Optional) Add Supabase credentials if using database features

### 3. Running the Application

**Option 1: Run both servers (Recommended)**

1. Start the React frontend (port 5000):
```bash
npm run dev
```

2. Start the Python backend (port 8000):
```bash
./start_backend.sh
```

**Option 2: Frontend only (limited features)**
```bash
npm run dev
```

### 4. Accessing the Application

- Frontend: http://localhost:5000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Key Features

1. **AI Quiz Generation**: Upload PDF files and generate custom quizzes using OpenAI GPT-5
2. **Personalized Motivation**: AI-generated motivational messages based on study progress
3. **Study Journal**: Track learning progress with AI-enhanced reflections
4. **Flashcards**: Interactive study cards for different subjects
5. **Progress Tracking**: Analytics and performance metrics

## Development Notes

- The frontend is built with React + TypeScript and uses Tailwind CSS
- The backend uses FastAPI with async/await for performance
- AI features require OpenAI API key and internet connection
- Database features are optional and use Supabase when configured
- Both servers support hot reload during development

## Troubleshooting

1. **Backend not responding**: Make sure port 8000 is available and start_backend.sh is executable
2. **AI features not working**: Check OPENAI_API_KEY in Replit Secrets
3. **PDF upload failing**: Ensure file is under 10MB and is a valid PDF
4. **Module import errors**: Restart the backend server to refresh Python path