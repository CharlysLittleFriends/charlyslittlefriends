async function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (!el) {
        // Non è un errore: semplicemente questa pagina non ha quel componente
        console.warn(`Elemento #${id} non trovato nel DOM`);
        return;
    }

    try {
        const html = await fetch(file).then(res => res.text());
        el.innerHTML = html;
    } catch (err) {
        console.error(`Errore nel caricamento di ${file}`, err);
    }
}

loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");
loadComponent("form", "components/form.html");