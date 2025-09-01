from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import Client
from typing import Optional
import os
from models import UserCreate, UserLogin, User, TokenResponse, APIResponse
from database import SupabaseDatabase

router = APIRouter()
security = HTTPBearer()

# Get Supabase client (you'll need to inject this)
def get_supabase_client():
    from supabase import create_client
    return create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_ANON_KEY"))

def get_database():
    return SupabaseDatabase(get_supabase_client())

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current authenticated user"""
    try:
        supabase = get_supabase_client()
        # Verify the JWT token
        user_response = supabase.auth.get_user(credentials.credentials)
        if not user_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user_response.user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

@router.post("/register", response_model=APIResponse)
async def register(user_data: UserCreate, db: SupabaseDatabase = Depends(get_database)):
    """Register a new user"""
    try:
        supabase = get_supabase_client()
        
        # Create user with Supabase Auth
        auth_response = supabase.auth.sign_up({
            "email": user_data.email,
            "password": user_data.password,
            "options": {
                "data": {
                    "full_name": user_data.full_name
                }
            }
        })
        
        if auth_response.user:
            # Create user profile in our database
            await db.create_user_profile(
                auth_response.user.id,
                user_data.email,
                user_data.full_name
            )
            
            return APIResponse(
                success=True,
                message="User registered successfully. Please check your email for verification.",
                data={"user_id": auth_response.user.id}
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Registration failed"
            )
            
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin):
    """Login user and return access token"""
    try:
        supabase = get_supabase_client()
        
        auth_response = supabase.auth.sign_in_with_password({
            "email": user_data.email,
            "password": user_data.password
        })
        
        if auth_response.user and auth_response.session:
            user = User(
                id=auth_response.user.id,
                email=auth_response.user.email,
                full_name=auth_response.user.user_metadata.get("full_name"),
                created_at=auth_response.user.created_at
            )
            
            return TokenResponse(
                access_token=auth_response.session.access_token,
                token_type="bearer",
                expires_in=auth_response.session.expires_in,
                user=user
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
            
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

@router.post("/logout", response_model=APIResponse)
async def logout(current_user = Depends(get_current_user)):
    """Logout current user"""
    try:
        supabase = get_supabase_client()
        supabase.auth.sign_out()
        
        return APIResponse(
            success=True,
            message="Logged out successfully"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Logout failed"
        )

@router.get("/me", response_model=User)
async def get_current_user_profile(current_user = Depends(get_current_user)):
    """Get current user profile"""
    return User(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.user_metadata.get("full_name"),
        created_at=current_user.created_at
    )