#!/usr/bin/env python3
"""
Start the Python FastAPI backend server.
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'python_backend'))

import uvicorn

if __name__ == "__main__":
    # Change to the backend directory
    os.chdir('python_backend')
    # Start the FastAPI server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )