"use strict";

const cryptoHelper = (function () {
    const enc = new TextEncoder();

    function arrayBufferToBase64(buffer) {
        const bytes = new Uint8Array(buffer);
        let binary = "";
        const chunk = 0x8000;
        for (let i = 0; i < bytes.length; i += chunk) {
            binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
        }
        return btoa(binary);
    }

    function base64ToUint8Array(base64) {
        const binary = atob(base64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
        return bytes;
    }

    function generateSaltBase64(length = 16) {
        const salt = new Uint8Array(length);
        window.crypto.getRandomValues(salt);
        return arrayBufferToBase64(salt.buffer);
    }

    async function hashPassword(password, saltBase64) {
        const passwordBytes = enc.encode(password);
        const saltBytes = base64ToUint8Array(saltBase64);
        const combined = new Uint8Array(passwordBytes.length + saltBytes.length);
        combined.set(passwordBytes);
        combined.set(saltBytes, passwordBytes.length);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', combined);
        return arrayBufferToBase64(hashBuffer);
    }

    return {
        generateSaltBase64,
        hashPassword,
        _internal: { arrayBufferToBase64, base64ToUint8Array }
    };
})();

window.cryptoHelper = cryptoHelper;
