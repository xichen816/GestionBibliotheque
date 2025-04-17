import type { Book } from "./../types/types"

interface BookGridProps {
    books: Book[]
}

export default function BookGrid({ books }: BookGridProps) {
    return (
        <div className="book-grid">
            {books.map((book) => (
                <a href={`/livre/${book.id}`} key={book.id}>
                    <div className="book-card">
                        <div className="book-cover">
                            {book.cover ? (
                                <img src={book.cover || "/placeholder.svg"} alt={book.title} />
                            ) : (
                                <span>{book.title[0]}</span>
                            )}
                        </div>
                        <div className="book-info">
                            <h3 className="book-title">{book.title}</h3>
                            <p className="book-author">{book.author}</p>
                            <div className={`book-status ${book.available ? "status-available" : "status-borrowed"}`}>
                                {book.available ? "Disponible" : "Emprunté"}
                            </div>
                            <button>Voir détails</button>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    )
}

