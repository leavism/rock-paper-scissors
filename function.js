const log = document.querySelector(".log");
let action = document.querySelector(".action");
let score = document.querySelector(".score");
let dark = false;

initiate();

function initiate() {
  updateLog("you approach the computer.", 1000);
  updateLog("it's offline.", 1500);

  let start = createChoices("", "start");
  action.appendChild(start);

  start.addEventListener("click", () => {
    action.removeChild(start);
    game();
  });
}

function game() {
  let playerScore = 0;
  let comScore = 0;
  let roundNumber = 0;

  updateLog("the computer turns on.", 500);
  updateLog("it awaits your choice.", 1000);

  let rps = createChoices("choices", "rock", "paper", "scissor");
  action.appendChild(rps);

  createScores("you", "computer");

  let rockBtn = document.querySelector(".rockBtn");
  rockBtn.addEventListener("click", () => {
    updateLog(`you chose rock.`, 250);
    tempDisable(rockBtn, 1000);
    let result = playRound("rock", roundNumber, playerScore, comScore);
    roundNumber = result.roundNumber;
    playerScore = result.playerScore;
    comScore = result.comScore;
    checkRound(roundNumber, comScore, playerScore, rps);
    fade();
    console.log(roundNumber);
  });

  let paperBtn = document.querySelector(".paperBtn");
  paperBtn.addEventListener("click", () => {
    let result = playRound("paper", roundNumber, playerScore, comScore);
    updateLog(`you chose paper.`, 250);
    tempDisable(paperBtn, 1000);
    roundNumber = result.roundNumber;
    playerScore = result.playerScore;
    comScore = result.comScore;
    checkRound(roundNumber, comScore, playerScore, rps);
    fade();
  });

  let scissorBtn = document.querySelector(".scissorBtn");
  scissorBtn.addEventListener("click", () => {
    let result = playRound("scissor", roundNumber, playerScore, comScore);
    updateLog(`you chose scissor.`, 250);
    tempDisable(scissorBtn, 1000);
    roundNumber = result.roundNumber;
    playerScore = result.playerScore;
    comScore = result.comScore;
    checkRound(roundNumber, comScore, playerScore, rps);
    fade();
  });
}

function checkRound(round, cScore, pScore, rps) {
  if (round == 5) {
    if (cScore > pScore) {
      updateLog("the computer wins.");
      action.removeChild(rps);
    } else if (pScore > cScore) {
      updateLog("you win.");
      action.removeChild(rps);
    } else {
      updateLog("neither won.");
      action.removeChild(rps);
    }
  }
  let roundValue = document.querySelector(".roundValue");
  roundValue.textContent = `${round}/5`;
}

function createScores() {
  let scoreTitle = document.createElement("label");
  scoreTitle.textContent = "score";
  score.appendChild(scoreTitle);

  for (let i = 0; i < arguments.length; i++) {
    let point = document.createElement("div");
    point.classList.add(`${arguments[i]}Score`);
    point.textContent = arguments[i];
    point.style.width = "175px";

    let value = document.createElement("span");
    value.classList.add(`${arguments[i]}Value`);
    value.textContent = "0";
    value.setAttribute("style", "float: right;");

    point.appendChild(value);
    score.appendChild(point);
  }

  let round = document.createElement("div");
  round.classList.add("round");
  round.textContent = "round";
  round.setAttribute("style", "width: 175px;margin-top: 10px;");

  let roundValue = document.createElement("span");
  roundValue.classList.add("roundValue");
  roundValue.textContent = "0/5";
  roundValue.setAttribute("style", "float: right;");
  round.appendChild(roundValue);
  score.appendChild(round);
}

function fade() {
  log.childNodes.forEach(p => {
    setTimeout(() => {
      p.style.opacity = parseFloat(p.style.opacity || 1) - 0.2;
    });
    if (parseFloat(p.style.opacity) < 0.0) {
      log.removeChild(p);
    }
  });
}

function playRound(playerSelection, roundNumber, playerScore, comScore) {
  let computerSelection = computerPlay();
  updateLog(`the computer chose ${computerSelection}.`, 500);
  let result = calculator(playerSelection, computerSelection);
  if (result) {
    playerScore++;
    updateLog("you scored.", 1000);
    updateScore("you");
  } else if (result === null) {
    updateLog("neither scored.", 1000);
  } else {
    comScore++;
    updateLog("the computer scored.", 1000);
    updateScore("computer");
  }
  return {
    roundNumber: roundNumber + 1,
    playerScore: playerScore,
    comScore: comScore
  };
}

function updateScore(winner) {
  let value = document.querySelector(`.${winner}Value`);
  console.log(value);
  value.textContent = parseInt(value.textContent) + 1;
}

function computerPlay() {
  let options = ["rock", "paper", "scissor"];
  let choice = Math.floor(Math.random() * 3) + 0;
  return options[choice];
}

function calculator(pSelection, cSelection) {
  if (pSelection === cSelection) return null;
  else if (pSelection == "rock") {
    if (cSelection == "paper") return false;
    return true;
  } else if (pSelection == "paper") {
    if (cSelection == "scissor") return false;
    return true;
  } else if (pSelection == "scissor") {
    if (cSelection == "rock") return false;
    return true;
  }
}

function createChoices(title) {
  let choices = document.createElement("div");
  choices.classList = "choices";
  let label = document.createElement("label");
  label.textContent = title;
  choices.appendChild(label);

  for (let i = 1; i < arguments.length; i++) {
    addChoice(choices, arguments[i]);
  }
  return choices;
}

function addChoice(parentNode, name) {
  let btn = document.createElement("button");
  btn.textContent = name;
  btn.classList = `${name}Btn`;
  if (dark) btn.classList.add("darkBtn");
  parentNode.appendChild(btn);
}

function updateLog(prompt, time) {
  let p = document.createElement("p");
  p.textContent = prompt;
  setTimeout(() => {
    log.prepend(p);
  }, time || 1000);
}

function tempDisable(button, time) {
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
  }, time || 1000);
}

function darkMode() {
  document.querySelector("body").classList.toggle("darken");
  let allBtns = document.querySelectorAll("button");
  dark = !dark;
  allBtns.forEach(btn => {
    btn.classList.toggle("darkBtn");
  });
}