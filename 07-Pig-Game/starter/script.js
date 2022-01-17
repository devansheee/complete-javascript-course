'use strict';

// Select elements
const player0Elem = document.querySelector('.player--0');
const player1Elem = document.querySelector('.player--1');
const score0Elem = document.querySelector('#score--0');
const score1Elem = document.getElementById('score--1');
const current0Elem = document.getElementById('current--0');
const current1Elem = document.getElementById('current--1');

const diceElem = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0Elem.textContent = 0;
score1Elem.textContent = 0;
diceElem.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

// Initial condition
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //only allow the button clicks if the game is not finish. this STATE variable will take care of the state of the game.
  playing = true;
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  score0Elem.textContent = 0;
  score1Elem.textContent = 0;
  current0Elem.textContent = 0;
  current1Elem.textContent = 0;

  diceElem.classList.add('hidden');
  player0Elem.classList.add('player--active');
  player0Elem.classList.remove('player--active');
  player1Elem.classList.remove('player-winner');
  player1Elem.classList.remove('player-active');
};

// call this function when the script is loaded or when the page is loaded or refreshed for the first time.
init();

const switchPlayer = function () {
  //switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = 1 - activePlayer;
  currentScore = 0;

  //removes the class if present and adds the class if not present. wooohooo
  player0Elem.classList.toggle('player--active');
  player1Elem.classList.toggle('player--active');
};

//  rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1, generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display it
    diceElem.classList.remove('hidden');
    diceElem.src = `dice-${dice}.png`;

    //3. check if 1, then switch the
    if (dice != 1) {
      //add dice to current score
      currentScore += dice;
      //current0Elem.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      /* 
   //switch to next player
   document.getElementById(`current--${activePlayer}`).textContent = 0;
   activePlayer = 1 - activePlayer;
   currentScore = 0;

   //removes the class if present and adds the class if not present. wooohooo
   player0Elem.classList.toggle('player--active');
   player1Elem.classList.toggle('player--active'); */
      switchPlayer();
    }
  }
});

// holding the current score and adding it to the main score;
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score of active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if current player score>=100 then end the game
    if (scores[activePlayer] >= 100) {
      //finish the game
      //always use . and # along with query selector.
      playing = false;
      diceElem.classList.remove('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
    } else {
      //3. switch player
      switchPlayer();
    }
  }
});

// new game
btnNew.addEventListener('click', init);
