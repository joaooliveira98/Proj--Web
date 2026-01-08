"use strict";

function main() {
    const listHtml = document.getElementById('cards-list');
    listCards(listHtml);
    shuffle();
    window.pairedCards = 0;
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
    
    checknum = checknum - checknum%2;
    clicknum = clicknum - clicknum%2;
    
    if(checknum === clicknum){
        checkedCard.checkBox.disabled = true;
        checkedCard.checkBox.checked = true;
        checkBox.disabled = true;
        checkBox.checked = true;
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