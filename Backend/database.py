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
                "SELECT l.titre, a.prenom, a.nom, e.date_debut, e.date_retour "
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
        query = (text("""
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
            ); """))

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

    def get_ratio_retard(self):
        ratio = []

        query = (text("""
        WITH emprunts_total AS (
        SELECT
            a.id_adherent,
            a.nom,
            a.prenom,
            a.email,
            COUNT(*) AS total_emprunts
        FROM emprunt e
        JOIN adherent a ON e.id_adherent = a.id_adherent
        GROUP BY a.id_adherent, a.nom, a.prenom, a.email
        ),
        emprunts_retard AS (
            SELECT
                a.id_adherent,
                COUNT(*) AS nb_retard
            FROM emprunt e
            JOIN adherent a ON e.id_adherent = a.id_adherent
            WHERE e.statut_emprunt = 'en retard'
            GROUP BY a.id_adherent
        )
        
        SELECT
            t.nom,
            t.prenom,
            t.email,
            r.nb_retard,
            t.total_emprunts,
            ROUND(CAST(r.nb_retard AS numeric) / t.total_emprunts * 100, 2) AS ratio_retard_percent
        FROM emprunts_total t
        JOIN emprunts_retard r ON t.id_adherent = r.id_adherent
        WHERE CAST(r.nb_retard AS float) / t.total_emprunts > 0.1;
        """))

        with self.engine.connect() as conn:
            result = conn.execute(query)
            for row in result :
                ratio.append(
                    {
                        "nom": row[0],
                        "prenom": row[1],
                        "email": row[2],
                        "nb_retard": row[3],
                        "total_emprunts": row[4],
                        "ratio_retard_percent": row[5]
                    }
                )
            return ratio

    def get_retard_une_semaine_etplus(self):
        resultat = []

        query = (text("""
        SELECT E.no_exemplaire, L.titre, E.id_adherent
        FROM Emprunt E
        JOIN Livre L ON E.id_livre = L.id_livre
        WHERE E.statut_emprunt = 'en cours'
            AND E.date_debut<= CURRENT_DATE - INTERVAL '21 days';
        """))

        with self.engine.connect() as conn:
            data = conn.execute(query)
            for row in data :
                resultat.append({
                    "no_exemplaire": row[0],
                    "titre_livre": row[1],
                    "id_adherent": row[2]
                })

            return resultat
