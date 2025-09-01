#!/bin/bash
# Combined startup script for DocuTutor application

echo "🚀 Starting DocuTutor AI Quiz & Study Assistant..."

# Start Python backend in background
echo "📚 Starting Python backend server..."
./start_backend.sh &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start React frontend
echo "🎨 Starting React frontend..."
npm run dev

# Cleanup function to stop backend when frontend exits
cleanup() {
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM EXIT