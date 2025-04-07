from typing import Union

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session

# ----------- appel de la base de données -----------
app = FastAPI()
models.Base.metadata.create_all(bind=engine)

class Bibliotheque(BaseModel):
    id_bibliotheque: int
    nb_adherent: int
    ville: str

class Adherent(BaseModel):
    id_adherent: int
    nom: str
    prenom: str
    email: str
    no_rue: str
    nom_rue: str
    code_postal: str
    ville: str
    province: str
    id_bibliotheque: int


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]


# ---------- endpoints ----------
@app.get("/")

def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}