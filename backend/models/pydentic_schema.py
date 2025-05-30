from datetime import datetime
from decimal import Decimal
from typing import Optional, List
from pydantic import BaseModel, EmailStr, conint, constr


# Пользователь
class UserBase(BaseModel):
    email: EmailStr
    name: str
    is_seller: bool = False

class UserCreate(UserBase):
    password: str  # пароль при создании (не хэш)

class UserRead(UserBase):
    id: int

    class Config:
        orm_mode = True


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
    rating: conint(ge=1, le=5)  # рейтинг 1-5 типа звездочек
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
