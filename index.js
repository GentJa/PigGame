const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

let scores,currentScore,activePlayer,playining;

const init = function () {
   scores = [0, 0];
   currentScore = 0;
   activePlayer = 0;
   playining = true;

  
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;


  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playining) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    // displayDiceRoll.textContent = randomNumber;
    diceEl.src = `/PigGame/img/dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      // current0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // console.log(activePlayer);
    } else {
      // me ndrru lojtarin...
      // console.log(activePlayer);

      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  //1. Add current score to active player's score.
  if (playining) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 10) {
      //finish the game.
      diceEl.classList.add("hidden");
      playining = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }
    // switch to the next player
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
