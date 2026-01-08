"use strict";

function registerNewUser(newUsername = String(), password = String()) {
    let message = "", status = "OK";
    if (!newUsername || typeof newUsername !== 'string' || newUsername.trim() === "") {
        message = "Nome de Usuario invalido!";
        status = "E";
        return { message, status };
    }
    if (!newUsername || typeof newUsername !== 'string' || newUsername.trim() === "") {
        message = "Palavra passe invalida!";
        status = "E";
        return { message, status };
    }
    // Get existing usernames from localStorage
    let usernames = JSON.parse(localStorage.getItem("usernames")) || [];
    // Avoid duplicates (case-insensitive)
    if (usernames.some(u => usernames.Username.toLowerCase() === newUsername.toLowerCase())) {
        message = `Nome de usuario"${newUsername}" já existe.`;
        status = "E";
        return { message, status };
    }
    usernames.push({ Username: newUsername, Password: password });
    localStorage.setItem("usernames", JSON.stringify(usernames));
    return { message, status };
}

function login(username = String(), password = String()) {
    let usernames = JSON.parse(localStorage.getItem("usernames")) || [];
    console.log(usernames);

    // Verificar utilizador
    const found = usernames.find(x => x.Username === username && x.Password === password);

    if (found) {
        document.cookie = `loggedIn=${username}`;
        console.log(document.cookie);
        console.log("login");

    } else {
        console.log("Credenciais incorretas!");
    }
}