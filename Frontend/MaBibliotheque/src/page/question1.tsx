import Header from "../../components/header.tsx";
import {useEffect, useState} from "react";
import {Adherent} from "../../types/types.ts";

export default function Question1() {
    const [adherent, setAdherent] = useState<Adherent[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/adherent")
            .then((res) => res.json())
            .then((data) => setAdherent(data));

    }, []);

    return (
        <>
            <Header />
            <p> ADHERENT : </p>
            {adherent.map((user) => (
                <p>{user.nom}</p>
            ))}
        </>
    )
}