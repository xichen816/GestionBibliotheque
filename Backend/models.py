from dataclasses import dataclass
from datetime import date

@dataclass
class Adherent:
    id_adherent: int
    nom: str
    prenom: str
    date_naissance: date
    adresse: str
    telephone: str
    email: str
