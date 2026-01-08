"use strict";

async function registerNewUser(newUsername = String(), password = String()) {
    let message = "", status = "OK";
    if (!newUsername || typeof newUsername !== 'string' || newUsername.trim() === "") {
        message = "Nome de Usuario invalido!";
        status = "E";
        return { message, status };
    }
    if (!password || typeof password !== 'string' || password.trim() === "") {
        message = "Palavra passe invalida!";
        status = "E";
        return { message, status };
    }
    // Get existing usernames from localStorage
    let usernames = JSON.parse(localStorage.getItem("usernames")) || [];
    // Avoid duplicates (case-insensitive)
    if (usernames.some(u => u.Username && u.Username.toLowerCase() === newUsername.toLowerCase())) {
        message = `Nome de usuario "${newUsername}" já existe.`;
        status = "E";
        return { message, status };
    }
    // Create salt and hash the password
    const salt = window.cryptoHelper.generateSaltBase64();
    const passwordHash = await window.cryptoHelper.hashPassword(password, salt);

    usernames.push({ Username: newUsername, PasswordHash: passwordHash, Salt: salt });
    localStorage.setItem("usernames", JSON.stringify(usernames));
    return { message, status };
}

async function login(username = String(), password = String()) {
    let usernames = JSON.parse(localStorage.getItem("usernames")) || [];
    // Find user by username (case-sensitive as before)
    const found = usernames.find(x => x.Username === username);
    if (!found) {
        console.log("Credenciais incorretas!");
        return false;
    }
    const expectedHash = found.PasswordHash;
    const salt = found.Salt;
    const providedHash = await window.cryptoHelper.hashPassword(password, salt);
    if (providedHash === expectedHash) {
        document.cookie = `loggedIn=${username}`;
        console.log(document.cookie);
        console.log("login");
        return true;
    } else {
        console.log("Credenciais incorretas!");
        return false;
    }
}
