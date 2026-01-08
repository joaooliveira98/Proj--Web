"use strict";
function main() {
    document.getElementById("login").addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        login(username,password);
    })
}
onload = main;