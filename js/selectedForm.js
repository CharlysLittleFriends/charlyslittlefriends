function loadDynamicForm() {
    const container = document.getElementById("form");
    if (!container) return;

    const subject = container.dataset.subject || "Messaggio dal sito";

    container.innerHTML = `
        <form id="contact-form" action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value="4eb5973e-d503-4db7-99be-55571dda5953">

            <!-- OGGETTO DINAMICO -->
            <input type="hidden" name="subject" value="${subject}">

            <div class="form-group">
                <label for="name">Nome</label>
                <input type="text" id="name" name="name" required placeholder="Nome">
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="Inserire mail">
            </div>

            <div class="form-group">
                <label for="message">Messaggio</label>
                <textarea id="message" name="message" rows="6" required placeholder="...♥... "></textarea>
            </div>

            <div class="form-group toggle-group">
                <label class="toggle">
                    <input type="checkbox" id="newsletter" name="newsletter" checked>
                    <span class="slider"></span>
                </label>
                <span class="toggle-text">Voglio sapere informazioni mensili su offerte e ultime news</span>
            </div>

            <button type="submit">Invia</button>
        </form>
    `;
}

// Se il form viene caricato dinamicamente (come il tuo header)
const observerForm = new MutationObserver(() => {
    if (document.querySelector("#form")) {
        loadDynamicForm();
        observerForm.disconnect();
    }
});

observerForm.observe(document.body, { childList: true, subtree: true });

// Se il form è già presente al caricamento
document.addEventListener("DOMContentLoaded", loadDynamicForm);
