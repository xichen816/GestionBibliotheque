from dataclasses import dataclass
from datetime import date

@dataclass
class Adherent:
    id_adherent: int
    nom: str
    prenom: str
    email: str
    no_rue : str
    nom_rue : str
    ville : str
    province : str
    pays : str


@dataclass
class Emprunt:
    id_emprunt: int
    id_adherent: int
    id_livre: int
    no_exemplaire: int
    date_debut: date
    date_fin: date
    statut_emprunt: str


@dataclass
class Commande:
    id_commande: int
    id_adherent: int
    id_livre: int
    statut_commande: str


@dataclass
class Livre:
    id_livre: int
    titre: str
    genre: str
    langue: str
    edition: str

@dataclass
class Exemplaire:
    no_exemplaire: int
    id_livre: int
    disponibilite: bool

@dataclass
class Auteur:
    id_auteur: int
    prenom: str
    nom: str
    nationalite: str
    annee_naissance: int

@dataclass
class LivreAuteur:
    id_livre: int
    id_auteur: int

@dataclass
class StatutEmprunt:
    statut_emprunt: str

@dataclass
class StatutCommande:
    statut_commande: str

@dataclass
class Genre:
    genre: str

