# alembic/env.py (async-safe) with metadata
import os
import asyncio
from logging.config import fileConfig
from dotenv import load_dotenv

from sqlalchemy import engine_from_config, pool
from sqlalchemy.ext.asyncio import create_async_engine
from alembic import context

# Load .env
load_dotenv()

# Alembic Config
config = context.config
fileConfig(config.config_file_name)

# Import your Base metadata
from backend.models.db_tables import Base  # <-- добавьте этот импорт

target_metadata = Base.metadata  # <-- и укажите metadata здесь

# Construct async DB URL
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST", "localhost")
port = os.getenv("DB_PORT", "5432")
db = os.getenv("DB_NAME")

ASYNC_DATABASE_URL = (
    f"postgresql+asyncpg://{user}:{password}@{host}:{port}/{db}"
)


def run_migrations_offline():
    url = ASYNC_DATABASE_URL.replace("+asyncpg", "")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online():
    connectable = create_async_engine(
        ASYNC_DATABASE_URL,
        poolclass=pool.NullPool,
        echo=True,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)
    await connectable.dispose()


def do_run_migrations(connection):
    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
