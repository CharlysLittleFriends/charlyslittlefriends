const observer = new MutationObserver(() => {
    const form = document.getElementById("contact-form");
    if (form) {
        attachValidation(form);
        observer.disconnect(); // smette di osservare
    }
});

observer.observe(document.body, { childList: true, subtree: true });

function attachValidation(form) {
    form.addEventListener("submit", (e) => {
        let valid = true;

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        if (name.value.trim() === "") {
            showError(name, "Il nome è obbligatorio");
            valid = false;
        } else clearError(name);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showError(email, "Inserisci una email valida");
            valid = false;
        } else clearError(email);

        if (message.value.trim() === "") {
            showError(message, "Il messaggio è obbligatorio");
            valid = false;
        } else clearError(message);

        if (!valid) e.preventDefault();
    });
}
