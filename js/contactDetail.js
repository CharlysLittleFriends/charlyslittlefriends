export function initItemSummary() {

    const params = new URLSearchParams(window.location.search);

    const type = params.get("type");
    const dim = params.get("dim");
    const colors = params.get("colors");
    const price = params.get("price");
    const date = params.get("date");
    const extra = params.get("extra");
    const img = params.get("img");

    const summaryText = document.getElementById("summary-text");
    if (!summaryText) return; // sicurezza

    if (!type || !dim || !colors) {
        summaryText.textContent = "Qualcosa è andato storto: nessun pupazzetto selezionato.";
        return;
    }

    summaryText.innerHTML = `
        <strong>Hai selezionato questo pupazzetto:</strong><br><br>
        Tipo: ${type}<br>
        Dimensioni: ${dim}<br>
        Colori: ${colors}<br>
        Prezzo: ${price ?? "-"}<br>
        Data: ${date ?? "-"}<br>
        Note: ${extra ?? "-"}<br><br>
        ${img ? `<img src="${img}" alt="Immagine pupazzetto" style="max-width:200px;border-radius:8px;">` : ""}
    `;

    const msg = document.getElementById("message");
    if (msg) {
        msg.value =
            `Ciao Charly,
vorrei informazioni su questo pupazzetto:

- Tipo: ${type}
- Dimensioni: ${dim}
- Colori: ${colors}
- Prezzo: ${price ?? "-"}
- Data: ${date ?? "-"}
- Note: ${extra ?? "-"}

Grazie!`;
    }
}
