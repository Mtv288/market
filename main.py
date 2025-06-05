import os
from fastapi import FastAPI
from contextlib import asynccontextmanager
from starlette.requests import Request
from starlette.responses import HTMLResponse
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
from backend.models.db_main import create_database, create_tables
from backend.routers import router
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException



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




@app.post("/login")
async def login(data: dict):
    username = data.get("username")
    password = data.get("password")

    if username == "user" and password == "pass":
        return {"message": "Успешный вход", "user": {"username": username}}
    else:

        raise HTTPException(status_code=401, detail="Неверный логин или пароль")


@app.get("/")
async def root():
    return {"message": "API работает"}

app.include_router(router)



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
