from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path
from pydantic import BaseModel

from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")


class Warframe(BaseModel):
    id: int
    name: str
    rank: int
    ability: str


DB: List[Warframe] = [
    Warframe(id=1, name="Ivara", rank=19, ability="Ripclaw, Poison Ivy"),
    Warframe(id=2, name="Excalibur", rank=30, ability="Enchanted Sword")
]


@app.get("/")
async def read_root():
    index_path = Path(__file__).parent / "dist" / "index.html"
    if not index_path.exists():
        raise HTTPException(status_code=404)
    return FileResponse(str(index_path))


@app.get("/api")
def read_db():
    return DB
