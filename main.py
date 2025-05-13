from fastapi import FastAPI, Request

app = FastAPI()



@app.get("/")
async def read_root(request: Request):
    return "ok"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)