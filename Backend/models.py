from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey

from database import Base

class Bibliotheque(Base) :
    __tablename__ = "bibliotheque"

    id_bibliotheque = Column(Integer, primary_key=True, index=True)
    nb_adherent = Column(Integer, nullable=True)
    ville = Column(String, nullable=False)

class Adherent(Base) :
    __tablename__ = "adherent"

    id_adherent = Column(Integer, primary_key=True, index=True)
    nom = Column(String, nullable=False)
    prenom = Column(String, nullable=False)
    email = Column(String, nullable=False)
    no_rue = Column(String, nullable=False)
    nom_rue = Column(String, nullable=False)
    code_postal = Column(String, nullable=False)
    ville = Column(String, nullable=False)
    province = Column(String, nullable=False)
    id_bibliotheque = Column(Integer, ForeignKey("bibliotheque.id_bibliotheque"), nullable=False)
