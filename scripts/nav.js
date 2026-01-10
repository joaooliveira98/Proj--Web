"use strict";

function main(){
    // Event listener for button click
    document.getElementById("logout").addEventListener("click", async (e) => {
        e.preventDefault();
        document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        window.parent.location.href = "index.html";
    });
    if ((new Map(document.cookie.split('; ').map((x) =>x.split('=')))).get('loggedIn') === "admin") {
        document.getElementById("definitions").classList=[];
    }
}
if (!(new Map(document.cookie.split('; ').map((x) =>x.split('=')))).has('loggedIn')) {
    window.parent.location.href = 'index.html'
}
onload = main;