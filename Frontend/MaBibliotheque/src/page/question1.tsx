import Header from "../../components/header.tsx";
import {useEffect, useState} from "react";

interface question1Type {
    titre : string,
    nom : string,
    prenom : string,
    date_debut : Date,
    date_fin : Date,
}

export default function Question1() {
    const [res, setRes] = useState<question1Type[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/question/question1")
            .then((res) => res.json())
            .then((data) => setRes(data));

    }, []);


    return (
        <>
            <Header/>
            <div style={{padding: "1rem"}}>
                <h3 style={{padding: "2rem"}}> Quels sont les livres actuellement empruntés et non retournés ? </h3>
                <table style={{width: "100%", borderCollapse: "collapse"}}>
                    <thead>
                    <tr style={{background: "#f0f0f0"}}>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Titre</th>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Nom</th>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Prenom</th>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Date d'emprunt</th>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Date de retour</th>
                    </tr>
                    </thead>
                    <tbody>
                    {res.map((result : question1Type) => (
                        <tr>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.titre}</td>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.nom}</td>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.prenom}</td>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.date_debut ? new Date(result.date_debut).toLocaleDateString() : ''}</td>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.date_fin ? new Date(result.date_fin).toLocaleDateString() : 'en cours'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>

    );
};
