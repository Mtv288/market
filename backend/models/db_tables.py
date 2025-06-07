from datetime import datetime
from decimal import Decimal
from typing import Optional

from sqlalchemy import ForeignKey, Numeric, Boolean, DateTime, String
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped, relationship

class Base(DeclarativeBase):
    pass

# Пользователи
class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, comment="Уникальный ID пользователя")
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, comment="Логин пользователя")
    name: Mapped[Optional[str]] = mapped_column(nullable=True, comment="Имя пользователя")
    email: Mapped[Optional[str]] = mapped_column(nullable=True, comment="Email пользователя")
    phone: Mapped[Optional[str]] = mapped_column(nullable=True, comment="Телефон пользователя")
    password: Mapped[str] = mapped_column(nullable=False, comment="Пароль пользователя")
    is_seller: Mapped[bool] = mapped_column(nullable=False, default=False, comment="Признак продавца")

    goods = relationship("Goods", back_populates="seller")
    orders = relationship("Order", back_populates="user")
    reviews = relationship("Review", back_populates="user")
    cart_items = relationship("CartItem", back_populates="user")


# Категории товаров
class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True, comment="Уникальный ID категории")
    name: Mapped[str] = mapped_column(nullable=False, unique=True, comment="Название категории")

    goods = relationship("Goods", back_populates="category")


# Бренды товаров
class Brand(Base):
    __tablename__ = "brands"

    id: Mapped[int] = mapped_column(primary_key=True, comment="Уникальный ID бренда")
    name: Mapped[str] = mapped_column(nullable=False, unique=True, comment="Название бренда")

    goods = relationship("Goods", back_populates="brand")


# Товары
class Goods(Base):
    __tablename__ = "goods"

    id: Mapped[int] = mapped_column(primary_key=True, comment="Уникальный ID товара")
    name: Mapped[str] = mapped_column(nullable=False, comment="Название товара")
    description: Mapped[str] = mapped_column(nullable=False, comment="Описание товара")
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False, comment="Цена товара")
    quantity: Mapped[int] = mapped_column(nullable=False, comment="Доступное количество")
    certificate: Mapped[Optional[str]] = mapped_column(nullable=True, comment="Сертификат товара (если есть)")

    seller_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, comment="ID продавца")
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"), nullable=False, comment="ID категории")
    brand_id: Mapped[Optional[int]] = mapped_column(ForeignKey("brands.id"), nullable=True, comment="ID бренда")

    seller = relationship("User", back_populates="goods")
    category = relationship("Category", back_populates="goods")
    brand = relationship("Brand", back_populates="goods")

    order_items = relationship("OrderItem", back_populates="goods")
    reviews = relationship("Review", back_populates="goods")
    cart_items = relationship("CartItem", back_populates="goods")


# Заказы
class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True, comment="Уникальный ID заказа")
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, comment="ID покупателя")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, comment="Дата создания заказа")
    total_amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False, comment="Общая сумма заказа")

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")
    payment = relationship("Payment", back_populates="order", uselist=False)


# Позиции в заказе
class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(primary_key=True, comment="Уникальный ID позиции")
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"), nullable=False, comment="ID заказа")
    goods_id: Mapped[int] = mapped_column(ForeignKey("goods.id"), nullable=False, comment="ID товара")
    quantity: Mapped[int] = mapped_column(nullable=False, comment="Количество")
    price_at_purchase: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False, comment="Цена на момент покупки")

    order = relationship("Order", back_populates="items")
    goods = relationship("Goods", back_populates="order_items")


# Отзывы
class Review(Base):
    __tablename__ = "reviews"

    id: Mapped[int] = mapped_column(primary_key=True, comment="Уникальный ID отзыва")
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, comment="ID автора")
    goods_id: Mapped[int] = mapped_column(ForeignKey("goods.id"), nullable=False, comment="ID товара")
    rating: Mapped[int] = mapped_column(nullable=False, comment="Оценка (1–5)")
    comment: Mapped[Optional[str]] = mapped_column(nullable=True, comment="Комментарий")

    user = relationship("User", back_populates="reviews")
    goods = relationship("Goods", back_populates="reviews")


# Оплаты
class Payment(Base):
    __tablename__ = "payments"

    id: Mapped[int] = mapped_column(primary_key=True, comment="Уникальный ID оплаты")
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"), nullable=False, comment="ID заказа")
    payment_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, comment="Дата оплаты")
    amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False, comment="Сумма оплаты")
    payment_method: Mapped[str] = mapped_column(nullable=False, comment="Метод оплаты (карта, и т.п.)")

    order = relationship("Order", back_populates="payment")


# Корзина пользователя
class CartItem(Base):
    __tablename__ = "cart_items"

    id: Mapped[int] = mapped_column(primary_key=True, comment="Уникальный ID позиции в корзине")
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, comment="ID пользователя")
    goods_id: Mapped[int] = mapped_column(ForeignKey("goods.id"), nullable=False, comment="ID добавленного товара")
    quantity: Mapped[int] = mapped_column(nullable=False, comment="Количество товара в корзине")

    user = relationship("User", back_populates="cart_items")
    goods = relationship("Goods", back_populates="cart_items")
