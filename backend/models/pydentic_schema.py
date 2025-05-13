from pydantic import BaseModel
from decimal import Decimal

class GoodsIn(BaseModel):
    name: str
    description: str
    price: Decimal
    quantity: int

    class Config:
        orm_mode = True