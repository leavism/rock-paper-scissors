let startBtn = document.querySelectorAll(".startBtn, .startBtn.darkBtn");

startBtn.forEach((sButton) => {
    sButton.addEventListener("click", start);
})


let log = document.querySelector("log");
let choices = document.querySelector("choices");
let playerChoices = document.createElement('playerChoices');
let scissorBtn = document.createElement('button');
let paperBtn = document.createElement('button');
let rockBtn = document.createElement('button');
let score = document.querySelector("score");

let options = ["rock", "paper", "scissor"];

let scoreLabel = document.createElement("label")
scoreLabel.textContent = "score";

let pScore = document.createElement("div")
pScore.classList = "pScore"
pScore.textContent = "you"
let pValue = document.createElement("span")
pValue.classList = "pValue"
pValue.textContent = "0"
pScore.append(pValue);

let cScore = document.createElement("div")
cScore.classList = "cScore"
cScore.textContent = "computer"
let cValue = document.createElement("span")
cValue.classList = "cValue"
cValue.textContent = "0"
cScore.append(cValue);

let rCount = document.createElement("div")
rCount.classList = "rCount"
rCount.textContent ="round"
let rValue = document.createElement("span");
rValue.classList = "rValue"
rValue.textContent = "0/5"
rCount.append(rValue);

let choiceLabel = document.createElement("label")
choiceLabel.textContent = "choices";

rockBtn.classList.add("rockBtn")
rockBtn.textContent = "Rock";
playerChoices.append(rockBtn);

paperBtn.classList.add("paperBtn")
paperBtn.textContent = "Paper";
playerChoices.append(paperBtn);

scissorBtn.classList.add("scissorBtn")
scissorBtn.textContent = "Scissor";
playerChoices.append(scissorBtn);

function start() {
    let startP = document.createElement("p");
    startP.textContent = "the computer turns on."

    let prompt1 = document.createElement("p");
    prompt1.textContent = "it awaits your choice."

    startBtn.forEach((sButton) => {
        sButton.remove();
    })
    

    log.prepend(startP);

    setTimeout(function () {
        log.prepend(prompt1);
        addChoices();
        addScores();
        addLabels()
        game();
    }, 1000);
}

function game() {
    let playerScore = parseInt(document.querySelector('span[class="pValue"]').textContent);
    let computerScore = parseInt(document.querySelector('span[class="cValue"]').textContent)
    let round = 0;

    rockBtn.addEventListener("click", function(){
        let computerChoice = computerPlay();
        let playerChoice = "rock";
        let promptRock = document.createElement('p');
        promptRock.textContent = "you choose rock."
        log.prepend(promptRock);

        let result = calculator(playerChoice, computerChoice);

        setTimeout(function(){
            let cPrompt = document.createElement('p');
            cPrompt.textContent = `the computer chooses ${computerChoice}.`
            log.prepend(cPrompt);

            if (result) {
                playerScore++;
                updateLog("you score.")
            }
            else if (result === null) {
                updateLog("neither scored.")
            }
            else { 
                computerScore++;
                updateLog("the computer scores.")
            };

            updateScores(playerScore, computerScore);
            round++;
            checkEnd(round, playerScore, computerScore);
        }, 500)

    });

    paperBtn.addEventListener("click", function(){
        let computerChoice = computerPlay();
        let playerChoice = "paper";
        let promptPaper = document.createElement('p');
        promptPaper.textContent = "you choose paper."
        log.prepend(promptPaper);

        let result = calculator(playerChoice, computerChoice);

        setTimeout(function(){
            let cPrompt = document.createElement('p');
            cPrompt.textContent = `the computer chooses ${computerChoice}.`
            log.prepend(cPrompt);

            if (result) {
                playerScore++;
                updateLog("you score.")
            }
            else if (result === null) {
                updateLog("neither scored.")
            }
            else { 
                computerScore++;
                updateLog("the computer scores.")
            };

            updateScores(playerScore, computerScore);
            round++;
            checkEnd(round, playerScore, computerScore);
        }, 500)

    });

    scissorBtn.addEventListener("click", function(){
        let computerChoice = computerPlay();
        let playerChoice = "scissor";
        let promptscissor = document.createElement('p');
        promptscissor.textContent = "you choose scissor."
        log.prepend(promptscissor);

        let result = calculator(playerChoice, computerChoice);

        setTimeout(function(){
            let cPrompt = document.createElement('p');
            cPrompt.textContent = `the computer chooses ${computerChoice}.`
            log.prepend(cPrompt);

            if (result) {
                playerScore++;
                updateLog("you score.")
            }
            else if (result === null) {
                updateLog("neither scored.")
            }
            else { 
                computerScore++;
                updateLog("the computer scores.")
            };

            updateScores(playerScore, computerScore);
            round++;
            checkEnd(round, playerScore, computerScore);
        }, 500)

    });
}

function updateLog(text){
    let genPrompt = document.createElement('p');
    genPrompt.textContent = text;
    log.prepend(genPrompt);
    // setTimeout(function(){
    //     log.prepend(genPrompt);
    // }, 1000)


    let nListCount = log.childElementCount;
    if(nListCount > 20) {
        log.removeChild(log.lastElementChild);
        log.removeChild(log.lastElementChild);
    } else if (nListCount > 22){
        log.removeChild(log.lastElementChild);
        log.removeChild(log.lastElementChild);
        log.removeChild(log.lastElementChild);
        log.removeChild(log.lastElementChild);
    }
}

function updateScores(pScore, cScore){
    pValue.textContent = pScore;
    cValue.textContent = cScore;
}

function addChoices() {
    choices.append(playerChoices)
}

function removeChoices(){
    while(choices.firstElementChild){
        choices.removeChild(choices.firstElementChild);
    }
}

function checkEnd(round, pScore, cScore){
    rValue.textContent = `${round}/5`;
    if(round >= 5){
        removeChoices();
        if (pScore == cScore){
            updateLog("it was a tie.")
        } else if (pScore > cScore) {
            updateLog("you win.")
        } else { updateLog("the computer wins.")}
    } else return;
}

function addScores() {
    score.append(pScore);
    score.append(cScore);
    score.append(rCount);
}

function addLabels(){
    choices.prepend(choiceLabel);
    score.prepend(scoreLabel);
}

function computerPlay() {
    let choice = Math.floor(Math.random() * 3) + 0;
    return options[choice];
}

// Determine whether the PLAYER won or lost
// true: won
// false: lost
// null: tie
function calculator(pSelection, cSelection) {
    if (pSelection === cSelection) return null;     // If same options, return null
    else if (pSelection == "rock") {                // If player chose rock,
        if (cSelection == "paper") return false;   // If computer chose paper, player lost
        return true;                                // Otherwise player wins
    } else if (pSelection == "paper") {
        if (cSelection == "scissor") return false;
        return true;
    } else if (pSelection == "scissor") {
        if (cSelection == "rock") return false;
        return true;
    }
}

function darkMode(){
    let page = document.querySelector("*");
    page.classList.toggle("darken");
    // page.setAttribute("style", "background: rgb(37, 37, 37); color: rgb(214, 214, 214);")

    rockBtn.classList.toggle("darkBtn")
    paperBtn.classList.toggle("darkBtn")
    scissorBtn.classList.toggle("darkBtn")
    // startBtn.classList.toggle("darkBtn")

    startBtn.forEach((sButton) => {
        sButton.classList.toggle("darkBtn")
    })

    // pScore.setAttribute("style", "background: rgb(37, 37, 37); color: rgb(214, 214, 214); border: rgb(214, 214, 214) solid 1px;")
    // cScore.setAttribute("style", "background: rgb(37, 37, 37); color: rgb(214, 214, 214); border: rgb(214, 214, 214) solid 1px;")
    pScore.classList.toggle("darkScore");
    cScore.classList.toggle("darkScore")
    rCount.classList.toggle("darkScore")

}
