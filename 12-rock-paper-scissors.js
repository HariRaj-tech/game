let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}; // Default Operator

updateScoreElement();
/*
if (!score){
  score = {
    wins: 0,
    losses:0,
    ties:0
  }
}
*/

let isAutoPlaying = false;
let intervalId = 0;

//const autoPlay = () => {
// }
function autoPlay() { // This function is Hoisting ony function.
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 500)
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Play';
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r')
    playGame('rock');
  else if (event.key === 'p')
    playGame('paper');
  else if (event.key === 's')
    playGame('scissors');
})

function playGame(playerMove){
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock')
      result = 'You Lose.';
    else if (computerMove === 'paper')
      result = 'You Win.';
    else if (computerMove === 'scissors')
      result = 'Tie.';
  }
  else if (playerMove === 'paper') {
    if (computerMove === 'rock')
      result = 'You Win.';
    else if (computerMove === 'paper')
      result = 'Tie.';
    else if (computerMove === 'scissors')
      result = 'You Lose.';
  }
  else if (playerMove === 'rock') {
    if (computerMove === 'rock')
      result = 'Tie.';
    else if (computerMove === 'paper')
      result = 'You Lose.';
    else if (computerMove === 'scissors')
      result = 'You Win.';
  }

  if (result === 'You Win.') score.wins++;
  else if (result === 'Tie.') score.ties++;
  else if (result === 'You Lose.') score.losses++;

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
  <img src="${playerMove}-emoji.png" class="move-icon">
  <img src="${computerMove}-emoji.png " class="move-icon">
  Computer`

}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1 / 3)
    computerMove = 'rock';
  else if (randomNumber >= 1 / 3 && randomNumber < 2/3)
    computerMove = 'paper';
  else if (randomNumber >= 2/3 && randomNumber < 1)
    computerMove = 'scissors';
  return computerMove;
}
