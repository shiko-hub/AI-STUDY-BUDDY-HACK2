#!/usr/bin/env python3
"""
Run the Python FastAPI backend for AI Quiz & Study Assistant
"""
import uvicorn
import os
from python_backend.main import app

if __name__ == "__main__":
    # Load environment variables
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    print(f"Starting AI Quiz & Study Assistant Python Backend...")
    print(f"Backend will be available at: http://{host}:{port}")
    print(f"API documentation will be available at: http://{host}:{port}/docs")
    
    uvicorn.run(
        app,
        host=host,
        port=port,
        reload=True,  # Enable auto-reload during development
        log_level="info"
    )