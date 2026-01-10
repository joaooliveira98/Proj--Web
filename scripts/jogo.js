"use strict";

function main() {
    const listHtml = document.getElementById('cards-list');
    listCards(listHtml);
    shuffle();
    window.pairedCards = 0;
    
    window.tries = 0;
    const numberTriesHtml = document.getElementById('number-tries');
    numberTriesHtml.textContent="Score: "+window.tries;

    let difficulty = getDifficulty()
    const difficultyHtml = document.getElementById('difficulty');
    difficultyHtml.selectedIndex = difficulty;

    window.numberCards = getNumberOfCards(difficulty);
    const numberCardsHtml = document.getElementById('number-cards');
    numberCardsHtml.textContent=window.pairedCards+"/"+numberCards;
}
onload = main;

function cardClick(idx=Number()){
    const card = document.getElementById(`card-${idx}`);
    const checkBox = card.parentElement.parentElement.children[0];
    if (checkBox.disabled) {
        return;
    }
    if (window.checkedCard === null || window.checkedCard === undefined) {
        window.checkedCard = {num:card.dataset.num, checkBox};
        return;
    }
    let checknum = checkedCard.num;
    let clicknum = card.dataset.num;
    
    if (checknum === clicknum)
        return
    
    window.tries += 1;
    const numberTriesHtml = document.getElementById('number-tries');
    numberTriesHtml.textContent="Score: "+window.tries;
    
    checknum = checknum - checknum%2;
    clicknum = clicknum - clicknum%2;
    
    if(checknum === clicknum){
        checkedCard.checkBox.disabled = true;
        checkedCard.checkBox.checked = true;
        checkBox.disabled = true;
        checkBox.checked = true;
        window.pairedCards+=2;
        const numberCardsHtml = document.getElementById('number-cards');
        numberCardsHtml.textContent=window.pairedCards+"/"+numberCards;
    }
    else
    {
        const checkChecked = Object.assign(checkedCard.checkBox);
        const clickedCheck = Object.assign(checkBox);
        setTimeout(() => {
            if (!checkChecked.disabled)
                checkChecked.checked = false;
            if (!checkBox.disabled)
                checkBox.checked = false;
        }, 1000)
    }
    checkedCard = null;
}

function novoJogo() {
    window.checkedCard = null;
    window.pairedCards = 0;
    window.tries = 0;
    const difficultyHtml = document.getElementById('difficulty');
    let difficulty = difficultyHtml.selectedIndex;
    localStorage.setItem("Difficulty", difficulty);

    const prevNumberCards = window.numberCards;
    window.numberCards = getNumberOfCards(difficulty);
    const numberCardsHtml = document.getElementById('number-cards');
    numberCardsHtml.textContent=window.pairedCards+"/"+window.numberCards;
    if (prevNumberCards !== window.numberCards) {
        const listHtml = document.getElementById('cards-list');
        listCards(listHtml);
        window.seed = undefined;
    }
    const cards = Array.from(document.getElementsByClassName('card'));
    cards.map(x => x.children[0])
        .forEach( x => {
            x.checked = false; 
            x.disabled = false;
    })
    setTimeout(() => {
        cards.forEach((x) => {
            x.classList.add('shuffle')
        })
        setTimeout(() => {
            cards.forEach((x) => {
                x.classList.remove('shuffle')
            })
        }, 500);
        shuffle();
    }, 1000);
}