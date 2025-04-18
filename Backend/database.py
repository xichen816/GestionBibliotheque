from fastapi import params
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from models import Adherent


class Database:

    def __init__(self):
        self.URL_DATABASE = 'postgresql://postgres:helloworld@localhost:5432/postgres'

        self.engine = create_engine(self.URL_DATABASE)

        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

        self.Base = declarative_base()

    def show_adherent(self) -> [Adherent]:
        adherents = []

        with self.engine.connect() as conn:
            result = conn.execute(text("SELECT * FROM adherent"))

            for row in result:
                adherent = Adherent(
                    id_adherent=row[0],
                    nom=row[1],
                    prenom=row[2],
                    date_naissance=row[3],
                    adresse=row[4],
                    telephone=row[5],
                    email=row[6]
                )
                adherents.append(adherent)

        return adherents

    def query(self, query_string):
        session = self.SessionLocal()
        try:
            result = session.execute(text(query_string), params or {})
            return result.fetchall()
        except Exception as e:
            print(f"Query failed: {e}")
            return None
        finally:
            session.close()