import Header from "../../components/header.tsx";
import {useEffect, useState} from "react";

interface question2Type {
    id_livre : number,
    titre : string,
    auteurs : string,
    nom_genre : string,
}

export default function Question2() {
    const [res, setRes] = useState<question2Type[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/question/question2")
            .then((res) => res.json())
            .then((data) => setRes(data));

    }, []);



    return (
        <>
            <Header/>
            <div style={{padding: "1rem"}}>
                <h3 style={{padding: "2rem"}}>Quels livres ont été commandés par des adhérents mais qui n'ont finalement jamais ete empruntés ?</h3>
                <table style={{width: "100%", borderCollapse: "collapse"}}>
                    <thead>
                    <tr style={{background: "#f0f0f0"}}>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>ID</th>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Titre</th>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Auteurs</th>
                        <th style={{border: "1px solid #ccc", padding: "8px"}}>Genre</th>
                    </tr>
                    </thead>
                    <tbody>
                    {res.map((result : question2Type) => (
                        <tr key={result.id_livre}>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.id_livre}</td>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.titre}</td>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.auteurs}</td>
                            <td style={{border: "1px solid #ccc", padding: "8px"}}>{result.nom_genre}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>

    );
};
