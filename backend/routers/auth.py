from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from ..dependensy.db import get_db
from ..models.pydentic_schema import UserCreate, UserOut, UserLogin, Token
from ..services.auth import authenticate_user, get_password_hash, create_access_token
from ..models.db_tables import User
import logging

router = APIRouter(tags=["auth"])

@router.post("/register", response_model=UserOut)
async def register(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    logging.info(f"Регистрация пользователя: {user_data.username}")
    query = select(User).where(User.username == user_data.username)
    result = await db.execute(query)
    existing_user = result.scalars().first()
    if existing_user:
        logging.warning(f"Пользователь с username {user_data.username} уже существует")
        raise HTTPException(status_code=400, detail="Пользователь с таким username уже существует")

    user = User(
        username=user_data.username,
        name=user_data.name,
        email=user_data.email,
        phone=user_data.phone,
        password=get_password_hash(user_data.password),
        is_seller=user_data.is_seller
    )
    db.add(user)
    try:
        await db.commit()
    except Exception as e:
        logging.error(f"Ошибка при сохранении пользователя: {e}")
        await db.rollback()
        raise HTTPException(status_code=500, detail="Ошибка сервера при регистрации")

    await db.refresh(user)
    return user

@router.post("/login", response_model=Token)
async def login(user_data: UserLogin, db: AsyncSession = Depends(get_db)):
    user = await authenticate_user(db, user_data.username, user_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Неверный логин или пароль")

    access_token = create_access_token({"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}
