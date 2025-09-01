#!/bin/bash
# Script to start the Python FastAPI backend

cd python_backend

# Set environment variables
export PYTHONPATH="$(pwd):$PYTHONPATH"

# Start the backend server
echo "Starting Python FastAPI backend on port 8000..."
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload