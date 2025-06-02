from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models.db_tables import Goods
from ..models.pydentic_schema import GoodsIn, GoodsOut


async def create_or_add_good(db: AsyncSession, data: GoodsIn) -> Goods:
    result = await db.execute(select(Goods).where(Goods.name == data.name))
    existing_good = result.scalars().first()

    if existing_good:
        existing_good.quantity += data.quantity
        db.add(existing_good)
        await db.commit()
        await db.refresh(existing_good)
        return existing_good
    else:
        new_good = Goods(
            name=data.name,
            description=data.description,
            price=data.price,
            quantity=data.quantity,
        )
        db.add(new_good)
        await db.commit()
        await db.refresh(new_good)
        return new_good


async def delete_good(name: str, db: AsyncSession) -> GoodsOut:
    stmt = select(Goods).where(Goods.name == name)
    result = await db.execute(stmt)
    good = result.scalar_one_or_none()

    if good is None:
        raise HTTPException(
            status_code=404,
            detail=f"Товар с именем '{name}' не найден."
        )

    await db.delete(good)
    await db.commit()
    return good