"use client"

import { useState } from "react"
import Header from "./../../components/header"
import { books } from "./../../data/books.ts"
import { adherent } from "./../../data/adherent.ts"

export default function Profile() {
    const [activeTab, setActiveTab] = useState("info")

    // Simuler un utilisateur connecté
    const currentUser = adherent[0]

    // Récupérer les livres empruntés et commandés
    const borrowedBooks = books.filter((book) => currentUser.borrowedBooks.includes(book.id))
    const orderedBooks = books.filter((book) => currentUser.orderedBooks.includes(book.id))

    return (
        <>
            <Header />
            <main className="main" id="profil">
                <div className="container">
                    <h1 className="section-title">Mon Profil</h1>

                    <div className="profile-section">
                        <div className="profile-header">
                            <div className="profile-avatar">{currentUser.name[0]}</div>
                            <div className="profile-info">
                                <h2>{currentUser.name}</h2>
                                <p>{currentUser.email}</p>
                            </div>
                        </div>

                        <div className="tab-buttons">
                            <button
                                className={`tab-button ${activeTab === "info" ? "active" : ""}`}
                                onClick={() => setActiveTab("info")}
                            >
                                Informations
                            </button>
                            <button
                                className={`tab-button ${activeTab === "history" ? "active" : ""}`}
                                onClick={() => setActiveTab("history")}
                            >
                                Historique
                            </button>
                            <button
                                className={`tab-button ${activeTab === "orders" ? "active" : ""}`}
                                onClick={() => setActiveTab("orders")}
                            >
                                Commandes
                            </button>
                        </div>

                        {activeTab === "info" && (
                            <div className="profile-info-content">
                                <div className="form-group">
                                    <label className="form-label">Nom</label>
                                    <input type="text" className="form-input" value={currentUser.name} readOnly />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-input" value={currentUser.email} readOnly />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Nombre de livres empruntés</label>
                                    <input type="text" className="form-input" value={borrowedBooks.length} readOnly />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Nombre de livres commandés</label>
                                    <input type="text" className="form-input" value={orderedBooks.length} readOnly />
                                </div>
                                <button>Modifier mon profil</button>
                            </div>
                        )}

                        {activeTab === "history" && (
                            <div className="profile-history-content">
                                <h3 style={{ marginBottom: "16px" }}>Livres actuellement empruntés</h3>
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
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div className="profile-orders-content">
                                <h3 style={{ marginBottom: "16px" }}>Livres commandés</h3>
                                {orderedBooks.length === 0 ? (
                                    <p>Vous n'avez aucune commande en cours.</p>
                                ) : (
                                    <ul className="book-list">
                                        {orderedBooks.map((book) => (
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
                                                        <span>Commandé le: {new Date().toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}
