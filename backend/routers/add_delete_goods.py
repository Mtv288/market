from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from ..models.pydentic_schema import GoodsIn, GoodsOut
from backend.services.add_delete_goods import create_or_add_good, delete_good
from ..dependensy.db import get_db

router = APIRouter(prefix="/goods", tags=["goods"])

@router.post(
    "/",
    response_model=GoodsOut,
    status_code=status.HTTP_201_CREATED,
    summary="Добавить новый товар",
)
async def add_good(
    payload: GoodsIn,
    db: AsyncSession = Depends(get_db),
):
    good = await create_or_add_good(db, payload)
    return good

@router.delete("/{name}", response_model=GoodsOut)
async def delete_goods_by_name(
    name: str,
    session: AsyncSession = Depends(get_db),
):

    return await delete_good(name=name, db=session)