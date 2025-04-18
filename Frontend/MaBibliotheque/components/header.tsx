import {Link, useLocation} from "react-router-dom";
import "./../src/index.css";

export default function Header() {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">MaBibliothèque</div>
                    <nav className="nav">
                        <Link to="/question1" className={`nav-link ${pathname === "/question1" ? "active" : ""}`}>
                            QUESTION 1
                        </Link>
                        <Link to="/question2" className={`nav-link ${pathname === "/question2" ? "active" : ""}`}>
                            QUESTION 2
                        </Link>
                        <Link to="/question3" className={`nav-link ${pathname === "/question3" ? "active" : ""}`}>
                            QUESTION 3
                        </Link>
                        <Link to="/question4" className={`nav-link ${pathname === "/question4" ? "active" : ""}`}>
                            QUESTION 4
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
