from fastapi import FastAPI
from contextlib import asynccontextmanager
from backend.models.db_main import create_database, create_tables
from backend.routers import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_database()
    await create_tables()
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(router)

@app.get("/")
async def read_root():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
