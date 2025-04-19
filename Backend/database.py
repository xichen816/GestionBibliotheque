from fastapi import params
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from models import Adherent, Livre, Emprunt


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
                    email=row[3],
                    no_rue =row[4],
                    nom_rue=row[5],
                    ville =row[6],
                    province =row[7],
                    pays=row[8],
                )
                adherents.append(adherent)

        return adherents

    def get_active_emprunts(self):
        result = []

        with self.engine.connect() as conn:
            data = conn.execute(text(
                "SELECT l.titre, a.prenom, a.nom, e.date_debut, e.date_fin "
                "FROM Emprunt e "
                "JOIN Livre l ON e.id_livre = l.id_livre "
                "JOIN Adherent a ON e.id_adherent = a.id_adherent "
                "WHERE e.statut_emprunt != 'rendu';"
            ))

            for row in data:
                result.append({
                    "titre": row[0],
                    "prenom": row[1],
                    "nom": row[2],
                    "date_debut": row[3],
                    "date_fin": row[4]
                })

        return result


    def get_livres_commande_mais_pas_empruntes(self):

        com = []
        query = text("""
        SELECT l.id_livre, l.titre, CONCAT(a.prenom, ' ', a.nom) AS auteurs, g.genre AS nom_genre
        FROM Livre l
        JOIN Livre_Auteur la ON l.id_livre = la.id_livre
        JOIN Auteur a ON la.id_auteur = a.id_auteur
        JOIN Genre g ON l.genre = g.genre
        WHERE l.id_livre IN (
            SELECT c.id_livre
            FROM Commande c
            WHERE c.id_livre NOT IN (
                SELECT e.id_livre
                FROM Emprunt e
            )
);

    """)

        with self.engine.connect() as conn:
            result = conn.execute(query)
            for row in result :
                com.append(
                    {
                        "id_livre": row[0],
                        "titre": row[1],
                        "auteurs": row[2],
                        "nom_genre": row[3]
                    }
                )
            return com