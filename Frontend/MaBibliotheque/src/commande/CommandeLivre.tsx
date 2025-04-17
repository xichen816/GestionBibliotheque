"use client"

import { useState } from "react"
import Header from "./../../components/header"
import { books } from "./../../data/books.ts"
import {Book} from "../../types/types.ts";


export default function OrderBook() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedBook, setSelectedBook] = useState<Book | null>(null)
    const [message, setMessage] = useState("")

    const filteredBooks = books.filter(
        (book) =>
            (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
            !book.available,
    )

    const handleOrder = () => {
        if (!selectedBook) {
            setMessage("Veuillez sélectionner un livre.")
            return
        }

        setMessage(
            `Votre commande pour "${selectedBook.title}" a été enregistrée. Vous serez notifié quand le livre sera disponible.`,
        )
        setSelectedBook(null)
    }

    return (
        <>
            <Header />
            <main className="main">
                <div className="container">
                    <h1 className="section-title">Commander un livre</h1>

                    <div className="profile-section">
                        <p>
                            Utilisez ce formulaire pour commander un livre actuellement indisponible. Vous serez notifié dès qu'il
                            sera disponible pour l'emprunt.
                        </p>

                        <div className="form-group" style={{ marginTop: "20px" }}>
                            <label htmlFor="search" className="form-label">
                                Rechercher un livre indisponible
                            </label>
                            <input
                                id="search"
                                type="text"
                                className="form-input"
                                placeholder="Titre ou auteur..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {searchTerm && (
                            <div className="search-results" style={{ marginTop: "20px" }}>
                                <h3 style={{ marginBottom: "12px" }}>Résultats de recherche</h3>
                                {filteredBooks.length === 0 ? (
                                    <p>Aucun livre indisponible ne correspond à votre recherche.</p>
                                ) : (
                                    <ul className="book-list">
                                        {filteredBooks.map((book) => (
                                            <li
                                                key={book.id}
                                                className="book-list-item"
                                                style={{
                                                    cursor: "pointer",
                                                    backgroundColor: selectedBook?.id === book.id ? "#f0f9ff" : "transparent",
                                                }}
                                                onClick={() => setSelectedBook(book)}
                                            >
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
                                                        <span className="status-borrowed">Indisponible</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {message && (
                            <div
                                className="message"
                                style={{
                                    marginTop: "20px",
                                    padding: "12px",
                                    backgroundColor: "#f0fff4",
                                    border: "1px solid #c6f6d5",
                                    borderRadius: "4px",
                                }}
                            >
                                {message}
                            </div>
                        )}

                        <div style={{ marginTop: "20px" }}>
                            <button onClick={handleOrder} disabled={!selectedBook} style={{ opacity: !selectedBook ? 0.7 : 1 }}>
                                Commander le livre
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
