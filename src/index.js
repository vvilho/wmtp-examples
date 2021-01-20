// Set the min and max numbers for the game as well as the max count number

const minNumber = 0;
const maxNumber = 100;



let randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
let guessed = 'no';
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const guessInputs = [];
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

gameGuide.innerHTML = `I have selected a random number between ${minNumber}
and ${maxNumber}.
I'll tell you if your guess was too high or too low.`;


const checkGuess = () => {

  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';

  }
  guesses.textContent += userGuess + ' ';
  guessInputs.push(userGuess);

  if (userGuess === randomNumber) {


    if (guessCount == 1){
      lastResult.textContent = `Congratulations! You got it right! It took you ${guessCount} guess`;
    }else{
      lastResult.textContent = `Congratulations! You got it right! It took you ${guessCount} guesses`;

    }
    guessed = 'yes';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();

  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber && userGuess >= minNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if(userGuess > randomNumber && userGuess <= maxNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    } else if (userGuess < minNumber) {
      lowOrHi.textContent = 'Last guess was out of range!';
    }else if (userGuess > maxNumber) {
      lowOrHi.textContent = 'Last guess was out of range!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
};

guessSubmit.addEventListener('click', checkGuess);

const setGameOver = () => {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.append(resetButton);
  resetButton.addEventListener('click', resetGame);
};

const resetGame = () => {
  guessCount = 1;
  guessed = 'no';

  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};

const autoGuesser = () => {
  guessField.value = (maxNumber + minNumber) /2;
  guessSubmit.click();

  while (guessed == 'no'){
    if(lowOrHi.textContent == "Last guess was too low!!"){
      guessField.value = (maxNumber + [...guessInputs].pop()) / 2;
      guessSubmit.click();
      console.log('arvaus');
    }else {
      guessField.value = (minNumber + [...guessInputs].pop()) / 2;
      guessSubmit.click();
      console.log('arvaus');

    }
  }
};

autoGuesser();
