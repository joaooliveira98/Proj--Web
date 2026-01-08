"use strict";

function getDifficulty() {
    let difficulty = +localStorage.getItem("Difficulty");
    if (difficulty === null || difficulty === undefined){
        difficulty = 0;
        localStorage.setItem("Difficulty", difficulty);
    }
    return difficulty;
}

function getNumberOfCards(difficulty=Number()) {
    let numberCardsDict = JSON.parse(localStorage.getItem("numberCards"));
    let numberCards = numberCardsDict? numberCardsDict[difficulty] : null;
    if (numberCards != null && numberCards != undefined) {
        return numberCards;
    }
    switch(difficulty){
        case 0: {
            numberCards = 10;
            break;
        }
        case 1: {
            numberCards = 20;
            break;
        }
        case 2: {
            numberCards = 30;
            break;
        }
        default: {
            numberCards = 2;
                break;
        }
    }
    if (numberCardsDict == null) {
        numberCardsDict = {}
    }
    numberCardsDict[difficulty] = numberCards;
    localStorage.setItem("numberCards", JSON.stringify(numberCardsDict));
    return numberCards;
}

function getImage(index=Number()){
    return cardImages[index]? cardImages[index] : '../resources/card-blank.svg';
}

function newCard(idx=Number(), imageFront=String()&&null, imageBack=String()&&null, disabled=Boolean()) {
    imageFront = imageFront ? imageFront : '../resources/card-blank.svg'
    imageBack = imageBack ? imageBack : '../resources/card-back.svg'
    const card = 
        `<div class="card">
            <input class="card-checkbox" type="checkbox" id="card-${idx}-checkbox"${disabled ? ' disabled checked' : ''}/>
            <label for="card-${idx}-checkbox" onclick="cardClick(${idx})">
                <img class="card-front" id="card-${idx}" draggable="false" src="${imageFront}" />
                <img class="card-back" draggable="false" src="${imageBack}" />
            </label>
        </div>`
    return card
}

function listCards(listHtml=Element(), disabled=Boolean()){
    listHtml.innerHTML = ""
    const difficulty = getDifficulty();
    const numCards = getNumberOfCards(difficulty);
    var list = ""

    window.cardImages = [];
    var fronts = JSON.parse(localStorage.getItem("cardImages"));
    if (fronts === null || fronts === undefined)
        fronts = {};
    for (let index = 0; index < Object.keys(fronts).length*2; index++) {
        cardImages[index] = fronts[index - (index%2)];
    }
    
    for (let index = 0; index < numCards; index++) {
        let image = getImage(index, difficulty)
        list += newCard(index, image, null, disabled)
    }
    listHtml.innerHTML += list
}

function shuffle(){
    window.seed = window.seed ?? Array.from(cardImages.keys())
    for (let i = 0; i < cardImages.length; i++) {
        let rand = Math.floor(Math.random()*cardImages.length);
        let temp = cardImages[i];
        cardImages[i] = cardImages[rand];
        cardImages[rand] = temp;
        temp = seed[i];
        seed[i] = seed[rand];
        seed[rand] = temp;
    }

    const cards = Array.from(document.getElementsByClassName('card')).map(x => x.children[1].children[0]);

    for (let i = 0; i < cards.length; i++) {
        cards[i].src = getImage(i);
        cards[i].dataset.num = seed[i];
    }
}