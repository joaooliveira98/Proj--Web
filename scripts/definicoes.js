"use strict";

function main() {
    let difficulty = getDifficulty()
    const difficultyHtml = document.getElementById('difficulty');
    difficultyHtml.selectedIndex = difficulty;
    difficultyHtml.onchange = () => setDifficulty(difficultyHtml.selectedIndex);

    let numberCards = getNumberOfCards(difficulty);
    const numberCardsHtml = document.getElementById('number-cards');
    numberCardsHtml.onchange = () => setNumberOfCards(numberCardsHtml.value);
    numberCardsHtml.min=2;
    numberCardsHtml.max=40;
    numberCardsHtml.step=2;
    numberCardsHtml.value=numberCards
    
    
    const listHtml = document.getElementById('cards-list');
    listCards(listHtml, true);
}
onload = main;

function cardClick(idx=Number()){
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";
    input.accept = ".jpg,.png,.svg";

    document.body.appendChild(input);

    input.addEventListener("change", () => {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const content = reader.result;
            let cardImages = JSON.parse(localStorage.getItem("cardImages"));
            if (cardImages === null || cardImages === undefined) {
                cardImages = {};
            }
            if (idx % 2 == 0) {
                cardImages[idx] = content;
                document.querySelectorAll(`#card-${idx}-checkbox ~ label > .card-front`)[0].src = content;
                document.querySelectorAll(`#card-${idx+1}-checkbox ~ label > .card-front`)[0].src = content;
            }
            else{
                cardImages[idx-1] = content;
                document.querySelectorAll(`#card-${idx}-checkbox ~ label > .card-front`)[0].src = content;
                document.querySelectorAll(`#card-${idx-1}-checkbox ~ label > .card-front`)[0].src = content;
            }
            localStorage.setItem("cardImages", JSON.stringify(cardImages));
        };

        reader.readAsDataURL(file);
        document.body.removeChild(input);
    });

    input.click();
}

function setDifficulty(selection=Number()){
    localStorage.setItem("Difficulty", selection)
    const numberCardsHtml = document.getElementById('number-cards')
    numberCardsHtml.value = getNumberOfCards(selection);
    const listHtml = document.getElementById('cards-list');
    listCards(listHtml, true);
}

function setNumberOfCards(number=Number()) {
    let numberCardsDict = JSON.parse(localStorage.getItem("numberCards"));
    numberCardsDict[getDifficulty()] = +number;
    localStorage.setItem("numberCards", JSON.stringify(numberCardsDict));
    const listHtml = document.getElementById('cards-list');
    listCards(listHtml, true);
}