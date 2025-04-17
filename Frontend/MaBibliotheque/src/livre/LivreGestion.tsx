"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "./../../components/header"
import { books } from "./../../data/books.ts"
import {Book} from "../../types/types.ts";
import { adherent } from "./../../data/adherent.ts"

export default function BookDetail() {
    const params = useParams()
    const [book, setBook] = useState<Book | null>(null)
    const [isBorrowed, setIsBorrowed] = useState(false)
    const [isOrdered, setIsOrdered] = useState(false)
    const [message, setMessage] = useState("")

    // Simuler un utilisateur connecté
    const currentUser = adherent[0]

    useEffect(() => {
        const bookId = Number(params.id)
        const foundBook = books.find((b) => b.id === bookId) || null
        setBook(foundBook)

        if (foundBook) {
            setIsBorrowed(currentUser.borrowedBooks.includes(foundBook.id))
            setIsOrdered(currentUser.orderedBooks.includes(foundBook.id))
        }
    }, [params.id])

    const handleBorrow = () => {
        if (!book) return

        if (!book.available) {
            setMessage("Ce livre n'est pas disponible actuellement.")
            return
        }

        // Simuler l'emprunt
        currentUser.borrowedBooks.push(book.id)
        book.available = false
        setIsBorrowed(true)
        setMessage("Livre emprunté avec succès!")
    }

    const handleReturn = () => {
        if (!book) return

        // Simuler le retour
        const index = currentUser.borrowedBooks.indexOf(book.id)
        if (index > -1) {
            currentUser.borrowedBooks.splice(index, 1)
        }
        book.available = true
        setIsBorrowed(false)
        setMessage("Livre retourné avec succès!")
    }

    const handleOrder = () => {
        if (!book) return

        if (book.available) {
            setMessage("Ce livre est disponible, vous pouvez l'emprunter directement.")
            return
        }

        if (isOrdered) {
            setMessage("Vous avez déjà commandé ce livre.")
            return
        }

        // Simuler la commande
        currentUser.orderedBooks.push(book.id)
        setIsOrdered(true)
        setMessage("Livre commandé avec succès! Vous serez notifié quand il sera disponible.")
    }

    if (!book) {
        return (
            <>
                <Header />
                <main className="main">
                    <div className="container">
                        <p>Livre non trouvé</p>
                    </div>
                </main>
            </>
        )
    }

    return (
        <>
            <Header />
            <main className="main">
                <div className="container">
                    <div className="book-detail">
                        <div className="book-detail-cover">
                            {book.cover ? (
                                <img src={book.cover || "/placeholder.svg"} alt={book.title} />
                            ) : (
                                <span>{book.title[0]}</span>
                            )}
                        </div>
                        <div className="book-detail-info">
                            <h1 className="book-detail-title">{book.title}</h1>
                            <p className="book-detail-author">par {book.author}</p>

                            <div className="book-detail-meta">
                                <div className="meta-item">
                                    <span className="meta-label">ISBN</span>
                                    <span className="meta-value">{book.isbn}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">Année de publication</span>
                                    <span className="meta-value">{book.publishedYear}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">Catégorie</span>
                                    <span className="meta-value">{book.category}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">Statut</span>
                                    <span className={`meta-value ${book.available ? "status-available" : "status-borrowed"}`}>
                    {book.available ? "Disponible" : "Emprunté"}
                  </span>
                                </div>
                            </div>

                            <div className="book-detail-description">
                                <h3>Description</h3>
                                <p>{book.description}</p>
                            </div>

                            {message && (
                                <div
                                    className="message"
                                    style={{
                                        marginBottom: "16px",
                                        padding: "8px",
                                        backgroundColor: "#f0fff4",
                                        border: "1px solid #c6f6d5",
                                        borderRadius: "4px",
                                    }}
                                >
                                    {message}
                                </div>
                            )}

                            <div className="action-buttons">
                                {isBorrowed ? (
                                    <button onClick={handleReturn}>Retourner</button>
                                ) : book.available ? (
                                    <button onClick={handleBorrow}>Emprunter</button>
                                ) : (
                                    <button onClick={handleOrder} disabled={isOrdered}>
                                        {isOrdered ? "Commandé" : "Commander"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
