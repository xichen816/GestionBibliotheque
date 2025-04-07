window.onload = function () {
    async function call(route) {
        try {
            const res = await fetch(route);
            const data = await res.text();
            document.getElementsByClassName('content-area')[0].innerHTML = data;
        } catch (err) {
            console.error("Erreur lors du chargement :", err);
            document.getElementsByClassName('content-area')[0].innerHTML = "<p style='color:red;'>Erreur de chargement.</p>";
        }
    }

    // Rendre la fonction call accessible dans le HTML (optionnel)
    window.call = call;
}