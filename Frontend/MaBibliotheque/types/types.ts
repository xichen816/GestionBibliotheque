export interface Book {
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

export interface User {
    id: number
    name: string
    email: string
    borrowedBooks: number[]
    orderedBooks: number[]
}