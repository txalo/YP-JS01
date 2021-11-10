// DOM elements
const $guessBTN = document.getElementById("guess");
const $guessInput = document.querySelector('#tried');
const $hintCorrect = document.getElementById("correct");
const $hintLess = document.getElementById("less");
const $hintGreater = document.getElementById("greater");
const $currentCard = document.getElementById("actual");
const $attemptCounter = document.querySelector("#attempts span");

let cardsNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let currentCard;
let totalAttempts = 0;
let currentAttempts = 0;
let round = 0;

let stars = 
{
    "1" : ["gold", "gold", "gold", "silver", "silver", "silver", "bronze", "bronze", "bronze", "black"],
    "2" : ["gold", "gold", "gold", "silver", "silver", "silver", "bronze", "bronze", "bronze", "black"],
    "3" : ["gold", "gold", "silver", "silver", "bronze", "bronze", "bronze", "black", "black", "black"],
    "4" : ["gold", "gold", "silver", "silver", "bronze", "bronze", "bronze", "black", "black", "black"],
    "5" : ["gold", "gold", "silver", "silver", "bronze", "bronze", "bronze", "black", "black", "black"],
    "6" : ["gold", "silver", "silver", "bronze", "bronze", "black", "black", "black", "black", "black"],
    "7" : ["gold", "silver", "bronze", "bronze", "black", "black", "black", "black", "black", "black"],
    "8" : ["gold", "silver", "bronze", "bronze", "black", "black", "black", "black", "black", "black"],
    "9" : ["gold", "silver", "bronze", "black", "black", "black", "black", "black", "black", "black"],
    "10" : ["gold", "silver", "bronze", "black", "black", "black", "black", "black", "black", "black"],
}

function startGame() {
    pickCard();
    attempts = 0;
    round = 1;
}

function pickCard() {
    currentCard = cardsNumbers[Math.floor(Math.random() * cardsNumbers.length)];
    cardsNumbers.splice(cardsNumbers.indexOf(currentCard), 1);
}


function compareCard(number) {
    return parseInt(currentCard) - parseInt(number);
}

function showHint(hintName) {
    document.getElementById(hintName).classList.add(hintName + "-pill");
}

function hideHints() {
    $hintCorrect.classList.remove("correct-pill");
    $hintLess.classList.remove("less-pill");
    $hintGreater.classList.remove("greater-pill");
}

function showCard(numero) {
    $currentCard.style.transform = "rotateY(360deg)";
    $currentCard.innerHTML = `<span>${numero}</span>`;
    $currentCard.classList.add("ok");
}

function hideCard() {
    $currentCard.style.transform = "none";
    $currentCard.innerHTML = `<span>?</span>`;
    $currentCard.classList.remove("ok");
}

function getRating() {
    return stars[round][((currentAttempts > 10)? 10 : currentAttempts) - 1];
}

$guessBTN.onclick = function () {
    hideHints();
    let number = $guessInput.value;
    let result = compareCard(number);
    attempts++;
    currentAttempts++;
    $attemptCounter.innerHTML = attempts;
    if (result === 0) {
        showHint("correct");
        showCard(currentCard);
        pickCard();
        setTimeout(function () {
            hideCard();
        }, 1500);
        hideHints();
        //document.getElementById("card-"+round).classList.add("done");
        document.getElementById("card-"+round).innerHTML = `<i class="fa fa-star ${getRating()}"></i>`;
        round++;        
        currentAttempts = 0;
    } else if (result < 0) {
        showHint("less");
        
    } else {
        showHint("greater");
        
    }
}

startGame();

//let stringP = "13"
//console.log(stringP.match(/^[0-9]{1,2}([,][0-9]{1,2})?$/g));
