let startBtn = document.querySelectorAll(".startBtn, .startBtn.darkBtn");

startBtn.forEach(sButton => {
  sButton.addEventListener("click", start);
});

let log = document.querySelector("log");
let choices = document.querySelector("choices");
let score = document.querySelector("score");

let playerChoices = document.createElement("playerChoices");
let scissorBtn = makeBtn("scissor");
let paperBtn = makeBtn("paper");
let rockBtn = makeBtn("rock");
playerChoices.append(rockBtn);
playerChoices.append(paperBtn);
playerChoices.append(scissorBtn);

let options = ["rock", "paper", "scissor"];

let scoreLabel = document.createElement("label");
scoreLabel.textContent = "score";

let pScore = makeScore("player");
let cScore = makeScore("computer");

let rCount = document.createElement("div");
rCount.classList = "rCount";
rCount.textContent = "round";
let rValue = document.createElement("span");
rValue.classList = "rValue";
rValue.textContent = "0/5";
rCount.append(rValue);

let choiceLabel = document.createElement("label");
choiceLabel.textContent = "choices";

function makeScore(name) {
  let score = document.createElement("div");
  score.classList = `${name[0]}Score`;
  score.textContent = name;

  let value = document.createElement("span");
  value.classList = `${name[0]}Value`;
  value.textContent = "0";
  score.append(value);
  return score;
}

function makeBtn(name) {
  let button = document.createElement("button");
  button.classList.add(`${name}Btn`);
  button.textContent = titleCase(name);
  return button;
}

function start() {
  let startP = document.createElement("p");
  startP.textContent = "the computer turns on.";

  let prompt1 = document.createElement("p");
  prompt1.textContent = "it awaits your choice.";

  startBtn.forEach(sButton => {
    sButton.remove();
  });

  log.prepend(startP);

  setTimeout(function() {
    log.prepend(prompt1);
    addChoices();
    addScores();
    addLabels();
    game();
  }, 1000);
}

function game() {
  let playerScore = parseInt(
    document.querySelector('span[class="pValue"]').textContent
  );
  let computerScore = parseInt(
    document.querySelector('span[class="cValue"]').textContent
  );
  let round = 0;

  rockBtn.addEventListener("click", function() {
    let computerChoice = computerPlay();
    let playerChoice = "rock";
    let promptRock = document.createElement("p");
    promptRock.textContent = "you choose rock.";
    log.prepend(promptRock);

    let result = calculator(playerChoice, computerChoice);

    updateLog(`the computer chooses ${computerChoice}.`, 500);

    if (result) {
      playerScore++;
      updateLog("you score.", 1000);
    } else if (result === null) {
      updateLog("neither scored.", 1000);
    } else {
      computerScore++;
      updateLog("the computer scores.", 1000);
    }

    updateScores(playerScore, computerScore);
    round++;
    checkEnd(round, playerScore, computerScore);
  });

  paperBtn.addEventListener("click", function() {
    let computerChoice = computerPlay();
    let playerChoice = "paper";
    let promptPaper = document.createElement("p");
    promptPaper.textContent = "you choose paper.";
    log.prepend(promptPaper);

    let result = calculator(playerChoice, computerChoice);

    updateLog(`the computer chooses ${computerChoice}.`, 500);

    if (result) {
      playerScore++;
      updateLog("you score.", 1000);
    } else if (result === null) {
      updateLog("neither scored.", 1000);
    } else {
      computerScore++;
      updateLog("the computer scores.", 1000);
    }

    updateScores(playerScore, computerScore);
    round++;
    checkEnd(round, playerScore, computerScore);
  });

  scissorBtn.addEventListener("click", function() {
    let computerChoice = computerPlay();
    let playerChoice = "scissor";
    let promptscissor = document.createElement("p");
    promptscissor.textContent = "you choose scissor.";
    log.prepend(promptscissor);

    let result = calculator(playerChoice, computerChoice);

    updateLog(`the computer chooses ${computerChoice}.`, 500);

    if (result) {
      playerScore++;
      updateLog("you score.", 1000);
    } else if (result === null) {
      updateLog("neither scored.", 1000);
    } else {
      computerScore++;
      updateLog("the computer scores.", 1000);
    }

    updateScores(playerScore, computerScore);
    round++;
    checkEnd(round, playerScore, computerScore);
  });
}

function updateLog(text) {
  if (arguments[1] === undefined) {
    var wait = 750;
  } else var wait = arguments[1];
  let genPrompt = document.createElement("p");
  genPrompt.textContent = text;
  setTimeout(function() {
    log.prepend(genPrompt);
  }, wait);

  let nListCount = log.childElementCount;
  if (nListCount > 20) {
    log.removeChild(log.lastElementChild);
    log.removeChild(log.lastElementChild);
  } else if (nListCount > 22) {
    log.removeChild(log.lastElementChild);
    log.removeChild(log.lastElementChild);
    log.removeChild(log.lastElementChild);
    log.removeChild(log.lastElementChild);
  }
}

function updateScores(playerScore, computerScore) {
  let cValue = cScore.firstElementChild;
  let pValue = pScore.firstElementChild;
  pValue.textContent = playerScore;
  cValue.textContent = computerScore;
}

function addChoices() {
  choices.append(playerChoices);
}

function removeChoices() {
  while (choices.firstElementChild) {
    choices.removeChild(choices.firstElementChild);
  }
}

function checkEnd(round, pScore, cScore) {
  rValue.textContent = `${round}/5`;
  if (round >= 5) {
    removeChoices();
    if (pScore == cScore) {
      updateLog("it was a tie.");
    } else if (pScore > cScore) {
      updateLog("you win.");
    } else {
      updateLog("the computer wins.");
    }
  } else return;
}

function addScores() {
  score.append(pScore);
  score.append(cScore);
  score.append(rCount);
}

function addLabels() {
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
  if (pSelection === cSelection) return null;
  // If same options, return null
  else if (pSelection == "rock") {
    // If player chose rock,
    if (cSelection == "paper") return false; // If computer chose paper, player lost
    return true; // Otherwise player wins
  } else if (pSelection == "paper") {
    if (cSelection == "scissor") return false;
    return true;
  } else if (pSelection == "scissor") {
    if (cSelection == "rock") return false;
    return true;
  }
}

function darkMode() {
  let page = document.querySelector("*");
  page.classList.toggle("darken");

  rockBtn.classList.toggle("darkBtn");
  paperBtn.classList.toggle("darkBtn");
  scissorBtn.classList.toggle("darkBtn");

  startBtn.forEach(sButton => {
    sButton.classList.toggle("darkBtn");
  });

  pScore.classList.toggle("darkScore");
  cScore.classList.toggle("darkScore");
  rCount.classList.toggle("darkScore");
}

function titleCase(str) {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}
