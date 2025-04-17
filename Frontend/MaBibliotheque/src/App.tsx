import { useState } from "react"
import Header from "./../components/header"
import BookGrid from "./../components/book-grid"
import { books } from "./../data/books.ts"
import "./App.css"
import {Book} from "../types/types.ts";

export default function App() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredBooks = books.filter(
        (book : Book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <>
            <Header />

            <main className="main">
                <div className="container">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Rechercher un livre par titre ou auteur..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <h1 className="section-title">Catalogue de livres</h1>
                    <BookGrid books={filteredBooks} />
                </div>
            </main>
        </>
    )
}
