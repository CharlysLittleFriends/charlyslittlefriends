// ID foglio Google Sheets
const sheetID = "1RrRTsOipfcbUtwS78FyqnTkNhcEdJ4DxMLwrXIQ38DI";
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;

let allRows = [];

// Fetch e parsing robusto della risposta JSON di Google Visualization
fetch(url)
    .then(res => res.text())
    .then(text => {
        try {
            const start = text.indexOf('{');
            const end = text.lastIndexOf('}');
            if (start === -1 || end === -1) throw new Error('Formato risposta inatteso');

            const jsonText = text.slice(start, end + 1);
            const json = JSON.parse(jsonText);

            allRows = (json.table && json.table.rows) ? json.table.rows : [];

            // RENDO GLOBALI
            window.allRows = allRows;
            window.renderCards = renderCards;

            // EMETTO EVENTO PER I FILTRI
            window.dispatchEvent(new Event("googleDataReady"));

            // Render iniziale (senza filtri)
            renderCards(allRows);

        } catch (err) {
            console.error('Errore parsing JSON:', err);
            showLoadError('Errore durante il parsing dei dati.');
        }
    })
    .catch(err => {
        console.error('Errore caricamento sheet:', err);
        showLoadError('Impossibile caricare i dati al momento.');
    });

function showLoadError(message) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = message;
    container.appendChild(p);
}

function renderCards(rows) {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    if (!rows || rows.length === 0) {
        const p = document.createElement('p');
        p.textContent = "Nessun elemento da mostrare.";
        container.appendChild(p);
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'cards-grid';
    container.appendChild(grid);

    rows.forEach((r, index) => {
        const type = r?.c?.[0]?.v ?? "";
        const dim = r?.c?.[1]?.v ?? "";
        const colors = r?.c?.[2]?.v ?? "";
        const price = r?.c?.[3]?.v ?? "";
        const date = r?.c?.[4]?.v ?? "";
        const img = r?.c?.[5]?.v ?? "";
        const extra = r?.c?.[6]?.v ?? "";

        const nome = `${dim} ${type} ${colors}`.trim() || `Pupazzetto ${index + 1}`;

        const card = document.createElement('article');
        card.className = 'friend-card';

        // immagine
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'card-image';
        if (img) {
            const image = document.createElement('img');
            image.src = escapeAttr(img);
            image.alt = nome;
            imgWrapper.appendChild(image);
        } else {
            const placeholder = document.createElement('div');
            placeholder.className = 'card-image-placeholder';
            placeholder.textContent = 'No image';
            imgWrapper.appendChild(placeholder);
        }
        card.appendChild(imgWrapper);

        // contenuto
        const content = document.createElement('div');
        content.className = 'card-content';

        const title = document.createElement('h3');
        title.textContent = nome;
        content.appendChild(title);

        const meta = document.createElement('ul');
        meta.className = 'card-meta';

        meta.innerHTML = `
            <li>Type: ${type || '-'}</li>
            <li>Dimensions: ${dim || '-'}</li>
            <li>Colors: ${colors || '-'}</li>
            <li>Price: ${price || '-'}</li>
            <li>Date: ${date || '-'}</li>
            ${extra ? `<li>Note: ${extra}</li>` : ""}
        `;

        content.appendChild(meta);

        const actions = document.createElement('div');
        actions.className = 'card-actions';

        const params = new URLSearchParams({ type, dim, colors, price, date, extra, img });
        const detailsLink = document.createElement('a');
        detailsLink.href = `contattami.html?${params.toString()}`;
        detailsLink.textContent = 'Richiedi Disponibilità';

        actions.appendChild(detailsLink);
        content.appendChild(actions);

        card.appendChild(content);
        grid.appendChild(card);
    });
}

function escapeAttr(url) {
    if (!url) return '';
    return String(url).replace(/"/g, '%22').replace(/'/g, '%27');
}
