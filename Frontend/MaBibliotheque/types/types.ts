export interface Livre {
    id: number
    title: string
    author: string
    description: string
    cover?: string
    available: boolean
    isbn: string
    publishedYear: number
    category: string
}

export interface Adherent {
    id : string,
    nom : string,
    prenom : string,
    date_naissance : Date,
    adresse : string,
    telephone : string,
    email  : string,
}