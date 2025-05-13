from decimal import Decimal
from sqlalchemy import Numeric
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped

class Base(DeclarativeBase):
    pass


class Goods(Base):

    __tablename__ = "goods"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False)

    def __repr__(self):
        return (f"Goods(id={self.id}, name='{self.name}', description='{self.description}',"
                f" price={self.price}, quantity={self.quantity})")

