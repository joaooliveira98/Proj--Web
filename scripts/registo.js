"use strict";

function main(){
    // Event listener for button click
    document.getElementById("register").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const passwordConfirm = document.getElementById("passwordConfirm").value.trim();
    
        const warning="";
    
        if(passwordConfirm !== password){
            warning ="Palavra passe e Confirmação de palavra passe não são iguais"
        }
        warning = registerNewUser(username, password);
        document.getElementById("username").value = ""; // Clear input
    });
}

onload = main;

