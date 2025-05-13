
from fastapi import FastAPI
from backend.models.db_main import create_user_and_db

app = FastAPI()



@app.on_event("startup")
def startup():
    create_user_and_db()

@app.get("/")
async def read_root():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)