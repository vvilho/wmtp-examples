// Set the min and max numbers for the game as well as the max count number

const minNumber = 0;
const maxNumber = 100;


let randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
let guessed = 'no';
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const guessInputs = [];
const lowOrHi = document.querySelector('.lowOrHi');
const avgGuessList = [];

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


    if (guessCount == 1) {
      lastResult.textContent = `Congratulations! You got it right! It took you ${guessCount} guess`;
    } else {
      lastResult.textContent = `Congratulations! You got it right! It took you ${guessCount} guesses`;

    }
    guessed = 'yes';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();

  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if (userGuess < randomNumber && userGuess >= minNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if (userGuess > randomNumber && userGuess <= maxNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    } else if (userGuess < minNumber) {
      lowOrHi.textContent = 'Last guess was out of range!';
    } else if (userGuess > maxNumber) {
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
  for (let i = 0; i < resetParas.length; i++) {
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


/**
 * The idea of the autoGuesser algorithm is first to guess from the middle of the minNumber and maxNumber. -> ((maxNumber - minNumber) / 2)
 * Then it gets comment "too low", "too high" or "correct". For example too high:
 * After that it again splits the search area in half by guessing the middle number from minNumber and the last guess in this case ((maxNumber - minNumber) / 2)
 * Algorithm always splits the area in half by guessing last known highest and lowest guess
 * This continues until the correct number is guessed.
 * If knownMax - knownMin is < 3 then it has already guessed max-1 or min-1 and then it guesses the minNumber or the MaxNumber
 */


const autoGuesser = () => {
  let knownMax = maxNumber;
  let knownMin = minNumber;
  guessField.value = ((knownMax + knownMin) / 2).toFixed();
  guessSubmit.click();

  while (guessed == 'no') {
    if (lowOrHi.textContent == "Last guess was too low!") {
      knownMin = [...guessInputs].pop();
      guessField.value = ((knownMin + knownMax) / 2).toFixed();
      guessSubmit.click();
    } else {
      knownMax = [...guessInputs].pop();
      guessField.value = ((knownMin + knownMax) / 2).toFixed();
      guessSubmit.click();
    }

    if (knownMax - knownMin < 3 && guessed == 'no') {
      if(knownMax < 10) {
        guessField.value = minNumber;
        guessSubmit.click();
      }else {
        guessField.value = maxNumber;
        guessSubmit.click();
      }



    }
  }

};


/**
 * Function to calculate average of an array
 * @param arr {array}
 * @returns {number}
 */
const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

/**
 * After 5000 rounds the average guess count is about 6.8
 * Maximum number of guesses with this algorithm is 8 (if min is 0 and max is 100). Theoretically maxNumber-minNumber +1 and in this case 101.
 * Minimum number of guesses is 1 if the random number is 50.
 */
const avgGuesser = () => {

  for (let i = 0; i < 5000; i++){
    autoGuesser();
    avgGuessList.push(guessCount);
    resetGame();
    i++;
  }
  console.log("After 5000 rounds the average guess number is: ",arrAvg(avgGuessList));
  console.log(
    "Maximum number of guesses with this algorithm is 8 (if min is 0 and max is 100). Theoretically maxNumber-minNumber +1 and in this case 101.\n" +
    "Minimum number of guesses is 1 if the random number is 50.");


};

avgGuesser();
autoGuesser();

