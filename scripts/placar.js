"use strict";

function main() {
    const placar = document.getElementById("placar");
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    
    const easy = document.createElement("ul");
    let easyBoard = leaderboard[0] ? leaderboard[0] : {};
    if (Object.keys(easyBoard).length > 0)
        easy.innerHTML = "<h2>Facil</h2>"
    for(let place in easyBoard){
        let li = document.createElement("li");
        li.innerText = place+": "+easyBoard[place];
        easy.append(li);
    }
    
    placar.append(easy);
    
    const med = document.createElement("ul");
    let medBoard = leaderboard[1] ? leaderboard[1] : {};
    if (Object.keys(medBoard).length > 0)
        med.innerHTML = "<h2>Médio</h2>"
    for(let place in medBoard){
        let li = document.createElement("li");
        li.innerText = place+": "+medBoard[place];
        med.append(li);
    }

    placar.append(med);
    
    const hard = document.createElement("ul");
    let hardBoard = leaderboard[2] ? leaderboard[2] : {};
    if (Object.keys(hardBoard).length > 0)
        hard.innerHTML = "<h2>Difícil</h2>"
    for(let place in hardBoard){
        let li = document.createElement("li");
        li.innerText = place+": "+hardBoard[place];
        hard.append(li);
    }

    placar.append(hard);
}
onload = main;

function setToLeaderBoard(score, user, difficulty){
    difficulty = difficulty ? difficulty : getDifficulty();
    
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    let diffBoard = leaderboard[difficulty] ? leaderboard[difficulty] : {};
    diffBoard[user] = diffBoard[user] ? diffBoard[user] < score ? diffBoard[user] : score : score;

    leaderboard[difficulty] = diffBoard;
    
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}