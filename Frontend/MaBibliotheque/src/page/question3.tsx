import Header from "../../components/header.tsx";
import {useEffect, useState} from "react";

interface question3Type {
    "nom": string,
    "prenom": string,
    "email": string,
    "nb_retard": number,
    "total_emprunts": number,
    "ratio_retard_percent": number,
}

export default function Question3() {
    const [res, setRes] = useState<question3Type[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/question/question3")
            .then((res) => res.json())
            .then((data) => setRes(data));

    }, []);
    return (
        <>
            <Header/>
            <div style={{padding: "1rem"}}>
                <h3 style={{padding: "2rem"}}>
                    On souhaite obtenir le nom, prénom, mail des adhérents avec un ratio retard/nombre d’emprunts supérieur à 10%, ainsi que le ratio. C'est-à-dire qu'au moins 10% des emprunts de l'adhérent sont en retard.
                </h3>
                <table style={{width: "100%", borderCollapse: "collapse"}}>
                    <thead>
                    <tr style={{background: "#f0f0f0"}}>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Nom</th>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Prenom</th>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Email</th>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Nombre de retards</th>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Nombre d'emprunts</th>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Ratio</th>
                    </tr>
                    </thead>
                    <tbody>
                    {res.map((result : question3Type) => (
                        <tr>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.nom}</td>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.prenom}</td>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.email}</td>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.nb_retard}</td>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.total_emprunts}</td>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.ratio_retard_percent}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>

    );
};