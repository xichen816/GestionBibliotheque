"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "./../../components/header"
import { books } from "./../../data/books.ts"
import {Book} from "../../types/types.ts";
import { adherent } from "./../../data/adherent.ts"

export default function BorrowedBooks() {
    const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([])

    // Simuler un utilisateur connecté
    const currentUser = adherent[0]

    useEffect(() => {
        // Récupérer les livres empruntés par l'utilisateur
        const userBorrowedBooks = books.filter((book) => currentUser.borrowedBooks.includes(book.id))
        setBorrowedBooks(userBorrowedBooks)
    }, [])

    return (
        <>
            <Header />
            <main className="main">
                <div className="container">
                    <h1 className="section-title">Mes Emprunts</h1>

                    {borrowedBooks.length === 0 ? (
                        <p>Vous n'avez aucun livre emprunté actuellement.</p>
                    ) : (
                        <ul className="book-list">
                            {borrowedBooks.map((book) => (
                                <li key={book.id} className="book-list-item">
                                    <div className="book-list-cover">
                                        {book.cover ? (
                                            <img src={book.cover || "/placeholder.svg"} alt={book.title} />
                                        ) : (
                                            <span>{book.title[0]}</span>
                                        )}
                                    </div>
                                    <div className="book-list-info">
                                        <h3 className="book-list-title">{book.title}</h3>
                                        <div className="book-list-meta">
                                            <span>{book.author}</span>
                                            <span>Emprunté le: {new Date().toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <Link href={`/livre/${book.id}`}>
                                        <button>Détails</button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </>
    )
}
