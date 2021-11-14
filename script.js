// DOM elements
const $guessBTN = document.getElementById("guess");
const $guessInput = document.querySelector('#tried');
const $hintCorrect = document.getElementById("correct");
const $hintLess = document.getElementById("less");
const $hintGreater = document.getElementById("greater");
const $currentCard = document.getElementById("actual");
const $attemptCounter = document.querySelector("#attempts span");

let GameStatus = 
{
    cardsNumbers : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],    
    totalAttempts : 0,
    round : 0,
    currentRound : {
        card : "",
        attempts : 0,
        number : "",
        result : ""
    }
}

let stars = 
{
    "1" : ["diamond", "gold", "gold", "silver", "silver", "silver", "bronze", "bronze", "bronze", "black"],
    "2" : ["diamond", "gold", "gold", "silver", "silver", "silver", "bronze", "bronze", "bronze", "black"],
    "3" : ["diamond", "gold", "silver", "silver", "bronze", "bronze", "bronze", "black", "black", "black"],
    "4" : ["diamond", "gold", "silver", "silver", "bronze", "bronze", "bronze", "black", "black", "black"],
    "5" : ["diamond", "gold", "silver", "silver", "bronze", "bronze", "bronze", "black", "black", "black"],
    "6" : ["diamond", "gold", "silver", "silver", "bronze", "bronze", "black", "black", "black", "black"],
    "7" : ["diamond","gold", "silver", "bronze", "bronze", "black", "black", "black", "black", "black"],
    "8" : ["diamond","gold", "silver", "bronze", "bronze", "black", "black", "black", "black", "black"],
    "9" : ["diamond","gold", "silver", "bronze", "black", "black", "black", "black", "black", "black"],
    "10" : ["gold", "silver", "bronze", "black", "black", "black", "black", "black", "black", "black"],
}

function startGame() {
    pickCard();
    GameStatus.totalAttempts = 0;
    GameStatus.round = 1;
}

function pickCard() {
    GameStatus.currentRound.card = GameStatus.cardsNumbers[Math.floor(Math.random() * GameStatus.cardsNumbers.length)];
    GameStatus.cardsNumbers.splice(GameStatus.cardsNumbers.indexOf(GameStatus.currentRound.card), 1);
}


function compareCard(number) {
    return parseInt(GameStatus.currentRound.card) - parseInt(number);
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
    $currentCard.innerHTML = `<span>&nbsp;&nbsp;</span>`;
    $currentCard.classList.remove("ok");
    hideHints();
}

function getRating() {
    return stars[GameStatus.round][((GameStatus.currentRound.attempts > 10)? 10 : GameStatus.currentRound.attempts) - 1];
}


function startRound() {
    hideHints();
    GameStatus.currentRound.number = $guessInput.value;
    GameStatus.currentRound.result = compareCard(GameStatus.currentRound.number);
}

function updateAttempts() {
    GameStatus.totalAttempts++;
    GameStatus.currentRound.attempts++;
    $attemptCounter.innerHTML = GameStatus.totalAttempts;
}

$guessBTN.onclick = function () {
    startRound();
    updateAttempts();    
    if (GameStatus.currentRound.result === 0) {
        showHint("correct");
        showCard(GameStatus.currentRound.card);
        pickCard();
        setTimeout(function () {
            hideCard();
        }, 1500);       
        
        document.getElementById("card-"+ GameStatus.round).innerHTML = `<i class="fa fa-star ${getRating()}"></i>`;
        GameStatus.round++;        
        GameStatus.currentRound.attempts = 0;
    } else if (GameStatus.currentRound.result < 0) {
        showHint("less");
        
    } else {
        showHint("greater");        
    }
    $guessInput.focus();
    $guessInput.value = "";    
}

startGame();
$guessInput.focus();
