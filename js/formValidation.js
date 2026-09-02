document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", (e) => {
        let valid = true;

        // Nome
        const name = document.getElementById("name");
        if (name.value.trim() === "") {
            showError(name, "Il nome è obbligatorio");
            valid = false;
        } else {
            clearError(name);
        }

        // Email
        const email = document.getElementById("email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showError(email, "Inserisci una email valida");
            valid = false;
        } else {
            clearError(email);
        }

        // Messaggio
        const message = document.getElementById("message");
        if (message.value.trim() === "") {
            showError(message, "Il messaggio è obbligatorio");
            valid = false;
        } else {
            clearError(message);
        }

        if (!valid) {
            e.preventDefault(); // blocca l'invio
        }
    });
});

// Funzioni per mostrare errori
function showError(input, message) {
    let error = input.parentElement.querySelector(".error-msg");
    if (!error) {
        error = document.createElement("div");
        error.className = "error-msg";
        input.parentElement.appendChild(error);
    }
    error.textContent = message;
}

function clearError(input) {
    const error = input.parentElement.querySelector(".error-msg");
    if (error) error.remove();
}
