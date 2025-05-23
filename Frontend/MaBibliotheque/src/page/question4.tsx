import Header from "../../components/header.tsx";
import {useEffect, useState} from "react";

interface question4Type {
    id_livre : number,
    titre : string,
    auteurs : string,
    nom_genre : string,
}

export default function Question4() {
    const [res, setRes] = useState<question4Type[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/question/question4")
            .then((res) => res.json())
            .then((data) => setRes(data));

    }, []);
    return (
        <>
            <Header/>
            <div style={{padding: "1rem"}}>
                <h3 style={{padding: "2rem"}}>
                    Voir les numéros d’exemplaire et le titre des livres en retard de plus qu’une semaine empruntée par un utilisateur ainsi que son ID
                </h3>
                <table style={{width: "100%", borderCollapse: "collapse"}}>
                    <thead>
                    <tr style={{background: "#f0f0f0"}}>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>No. Exemplaire</th>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Titre</th>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>ID Adhérent</th>
                    </tr>
                    </thead>
                    <tbody>
                    {res.map((result : question4Type) => (
                        <tr key={result.id_livre}>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.no_exemplaire}</td>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.titre_livre}</td>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.id_adherent}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>

    );
};