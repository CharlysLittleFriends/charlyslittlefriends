async function loadComponent(id, file) {
    const el = document.getElementById(id);
    const html = await fetch(file).then(res => res.text());
el.innerHTML = html;
}

loadComponent("header", "components\\header.html");
loadComponent("footer", "components\\footer.html");
loadComponent("form", "components\\form.html");