from contextlib import asynccontextmanager
from backend.models.db_main import create_database, create_tables
from backend.routers import router
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI




@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_database()
    await create_tables()
    yield



app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



