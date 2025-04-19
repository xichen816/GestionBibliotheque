export interface Livre {
    id_livre: number;
    titre: string;
    genre: string;
    langue: string;
    edition: string;
}


export interface Exemplaire {
    no_exemplaire: number;
    id_livre: number;
    disponibilite: boolean;
}

export interface Auteur {
    id_auteur: number;
    prenom: string;
    nom: string;
    nationalite: string;
    annee_naissance: number;
}

export interface LivreAuteur {
    id_livre: number;
    id_auteur: number;
}


export interface Adherent {
    id_adherent: number;
    nom: string;
    prenom: string;
    email: string;
    no_rue: string;
    nom_rue: string;
    ville: string;
    province: string;
    pays: string;
}

export interface Emprunt {
    id_emprunt: number;
    id_adherent: number;
    id_livre: number;
    no_exemplaire: number;
    date_debut: string; // or Date if you parse it
    date_fin: string;   // or Date
    statut_emprunt: string;
}


export interface Commande {
    id_commande: number;
    id_adherent: number;
    id_livre: number;
    statut_commande: string;
}

export interface StatutEmprunt {
    statut_emprunt: string;
}

export interface StatutCommande {
    statut_commande: string;
}


export interface Genre {
    genre: string;
}
