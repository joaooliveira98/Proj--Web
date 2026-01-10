"use strict";
function main() {
    document.getElementById("login").addEventListener("click", async () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");
        const result = await login(username,password);
        if(result){
            window.location.href = 'home.html'
        }
        else{
            message.textContent = "Erro no login!";
            message.classList = [];
        }
    })
}
if ((new Map(document.cookie.split('; ').map((x) =>x.split('=')))).has('loggedIn')) {
    window.location.href = 'home.html'
}
onload = main;