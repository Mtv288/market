import os
from fastapi import FastAPI
from contextlib import asynccontextmanager
from starlette.requests import Request
from starlette.responses import HTMLResponse
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
from backend.models.db_main import create_database, create_tables
from backend.routers import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_database()
    await create_tables()
    yield



app = FastAPI(lifespan=lifespan)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "frontend", "login_registration", "static")


app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


TEMPLATES_DIR = os.path.join(BASE_DIR, "frontend", "login_registration", "templates")
templates = Jinja2Templates(directory=TEMPLATES_DIR)

app.include_router(router)

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



