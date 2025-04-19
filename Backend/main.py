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

# question 1 : Quels livres ont été commandés par des adhérents mais jamais empruntés par personne?
@app.get("/question/question1")
def question_1():
    return database.get_active_emprunts()


# question 2 : Quels sont les livres actuellement empruntés et non retournés ?
@app.get("/question/question2")
def question_2():
    return database.get_livres_commande_mais_pas_empruntes()


# question 3 :
@app.get("/question/question3")
def question_3():
    return database.get_ratio_retard()


# question 4 :
@app.get("/question/question4")
def question_4():
    return