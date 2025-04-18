from typing import Union

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from typing import List, Annotated
#import models
from database import Database
from sqlalchemy.orm import Session



# ----------- appel de la base de données -----------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

database = Database()


# ---------- endpoints ----------
@app.get("/adherent")
def read_root():
    return database.show_adherent()


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}