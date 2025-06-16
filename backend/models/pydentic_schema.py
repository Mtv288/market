from datetime import datetime
from decimal import Decimal
from typing import Optional, List
from pydantic import BaseModel, EmailStr, conint, field_validator
import re

# Пользователь
class UserBase(BaseModel):
    username: str
    name: Optional[str] = None
    is_seller: bool = False

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    phone: str
    password: str
    is_seller: bool = False
    name: Optional[str] = None

    @field_validator("password")
    @classmethod
    def strong_password(cls, v):
        if len(v) < 8:
            raise ValueError("Пароль должен быть не менее 8 символов")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Пароль должен содержать заглавную букву")
        if not re.search(r"[a-z]", v):
            raise ValueError("Пароль должен содержать строчную букву")
        if not re.search(r"[0-9]", v):
            raise ValueError("Пароль должен содержать цифру")
        return v

class UserOut(UserBase):
    id: int
    email: Optional[EmailStr] = None
    phone: Optional[str] = None

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Optional[UserOut] = None

class TokenData(BaseModel):
    user_id: Optional[int] = None


# Категория
class CategoryBase(BaseModel):
    name: str

class CategoryRead(CategoryBase):
    id: int

    class Config:
        orm_mode = True


# Бренд
class BrandBase(BaseModel):
    name: str

class BrandRead(BrandBase):
    id: int

    class Config:
        orm_mode = True


# Товар
class GoodsBase(BaseModel):
    name: str
    description: str
    price: Decimal
    quantity: int
    certificate: Optional[str] = None
    seller_id: int
    category_id: int
    brand_id: Optional[int] = None

class GoodsRead(GoodsBase):
    id: int

    class Config:
        orm_mode = True


# Позиция в заказе
class OrderItemBase(BaseModel):
    goods_id: int
    quantity: int
    price_at_purchase: Decimal

class OrderItemRead(OrderItemBase):
    id: int

    class Config:
        orm_mode = True


# Заказ
class OrderBase(BaseModel):
    user_id: int
    total_amount: Decimal

class OrderRead(OrderBase):
    id: int
    created_at: datetime
    items: List[OrderItemRead] = []

    class Config:
        orm_mode = True


# Отзыв
class ReviewBase(BaseModel):
    user_id: int
    goods_id: int
    rating: conint(ge=1, le=5)
    comment: Optional[str] = None

class ReviewRead(ReviewBase):
    id: int

    class Config:
        orm_mode = True


# Оплата
class PaymentBase(BaseModel):
    order_id: int
    amount: Decimal
    payment_method: str

class PaymentRead(PaymentBase):
    id: int
    payment_date: datetime

    class Config:
        orm_mode = True


# Элемент корзины
class CartItemBase(BaseModel):
    user_id: int
    goods_id: int
    quantity: int

class CartItemRead(CartItemBase):
    id: int

    class Config:
        orm_mode = True

