import asyncpg
import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from backend.models.db_tables import Base

load_dotenv()


DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME")
DEFAULT_DB = os.getenv("DEFAULT_DB", "postgres")


DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    DATABASE_URL = (
        f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@"
        f"{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )


engine = create_async_engine(DATABASE_URL, echo=True, future=True)


async_session_maker = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=True # Тут если False поставить то не будет постоянно в бд лезть, для разработки можно пользовать
)


async def create_database():
    conn = await asyncpg.connect(
        user=DB_USER,
        password=DB_PASSWORD,
        database=DEFAULT_DB,
        host=DB_HOST,
        port=DB_PORT
    )

    exists = await conn.fetchval(
        "SELECT 1 FROM pg_catalog.pg_database WHERE datname = $1", DB_NAME
    )
    if exists:
        print(f"ℹ️ База данных '{DB_NAME}' уже существует.")
    else:
        await conn.execute(sql := f'CREATE DATABASE "{DB_NAME}"')
        print(f"✅ База данных '{DB_NAME}' была успешно создана.")

    await conn.close()


async def create_tables():
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("✅ Таблицы успешно созданы.")
    except Exception as e:
        print(f"❌ Ошибка при создании таблиц: {e}")


