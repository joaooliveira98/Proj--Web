"use strict";

function main(){
    // Event listener for button click
    document.getElementById("register").addEventListener("click", async () => {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const passwordConfirm = document.getElementById("passwordConfirm").value.trim();

        if (passwordConfirm !== password) {
            alert("Palavra passe e Confirmação de palavra passe não são iguais");
            return;
        }
        const result = await registerNewUser(username, password);
        if (result.status === "OK") {
            alert("Registo efetuado com sucesso");
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            document.getElementById("passwordConfirm").value = "";
        } else {
            alert(result.message || "Erro ao registar");
        }
    });
}

onload = main;

