"use strict";

function main(){
    // Event listener for button click
    document.getElementById("register").addEventListener("click", async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const passwordConfirm = document.getElementById("passwordConfirm").value.trim();
        const message = document.getElementById("message");

        if (passwordConfirm !== password) {
            message.textContent = "Palavra passe e Confirmação de palavra passe não são iguais";
            message.classList = [];
            return;
        }
        const result = await registerNewUser(username, password);
        if (result.status === "OK") {
            window.location.href = "index.html";
        } else {
            message.textContent = (result.message || "Erro ao registar");
            message.classList = [];
        }
    });
}

onload = main;

