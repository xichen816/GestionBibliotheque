import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
    const pathname = usePathname()

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">Bibliothèque</div>
                    <nav className="nav">
                        <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
                            Accueil
                        </Link>
                        <Link href="/commande" className={`nav-link ${pathname === "/commande" ? "active" : ""}`}>
                            Commander
                        </Link>
                        <Link href="/emprunts" className={`nav-link ${pathname === "/emprunts" ? "active" : ""}`}>
                            Mes emprunts
                        </Link>
                        <Link href="/profil" className={`nav-link ${pathname === "/profil" ? "active" : ""}`}>
                            Profil
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}
