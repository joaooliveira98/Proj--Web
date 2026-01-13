"use strict";

function main(){
    if ((new Map(document.cookie.split('; ').map((x) =>x.split('=')))).get('loggedIn') !== "admin") {
        document.getElementById("admin-tutorial").style = "display:none";
    }
}

onload = main;