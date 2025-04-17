import "./../src/index.css";

export default function Header() {
    const pathname = window.location.pathname;

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">MaBibliothèque</div>
                    <nav className="nav">
                        <a href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
                            Accueil
                        </a>
                        <a href="/commande" className={`nav-link ${pathname === "/commande" ? "active" : ""}`}>
                            Commander
                        </a>
                        <a href="/emprunts" className={`nav-link ${pathname === "/emprunts" ? "active" : ""}`}>
                            Mes emprunts
                        </a>
                        <a href="/profil" className={`nav-link ${pathname === "/profil" ? "active" : ""}`}>
                            Profil
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    )
}
