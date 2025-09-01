#!/usr/bin/env python3
"""
Test the backend components directly.
"""

import sys
import os

# Add python_backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'python_backend'))

try:
    print("Testing imports...")
    
    # Test basic imports
    from models import APIResponse, QuizCreate
    print("✓ Models import successful")
    
    from database import SupabaseDatabase
    print("✓ Database import successful")
    
    # Test AI service import
    from services.ai_service import AIService
    print("✓ AI Service import successful")
    
    # Test main app
    from main import app
    print("✓ Main app import successful")
    
    print("\n✅ All imports successful! Backend components are working.")
    
except Exception as e:
    print(f"❌ Import error: {e}")
    import traceback
    traceback.print_exc()