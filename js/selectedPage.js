function activateCurrentPage() {
    const headerDiv = document.getElementById("header");
const active = headerDiv?.dataset.active;
if (!active) return;

const links = headerDiv.querySelectorAll("header nav a");
    links.forEach(link => {
        const href = link.getAttribute("href").replace(".html", "");
if (href === active) {
    link.classList.add("active");
        }
    });
}

const observer = new MutationObserver(() => {
    if (document.querySelector("#header header nav a")) {
    activateCurrentPage();
observer.disconnect();
    }
});

observer.observe(document.getElementById("header"), {childList: true, subtree: true });
