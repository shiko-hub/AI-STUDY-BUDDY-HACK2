#!/usr/bin/env python3
"""
Start script for the Python FastAPI backend server.
This script ensures proper module path setup and starts the server.
"""

import sys
import os
import uvicorn

# Add the current directory to Python path for relative imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    # Start the FastAPI server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        reload_dirs=[os.path.dirname(os.path.abspath(__file__))]
    )