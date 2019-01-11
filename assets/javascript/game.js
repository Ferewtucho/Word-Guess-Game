// Word list

var champWords = [
  "eagles",
  "steelers",
  "patriots",
  "packers",
  "cowboys",
  "broncos",
  "rams",
  "falcons",
  "colts"
];

const maxTries = 10; // Maximum number of tries player has

var guessedLetters = []; // Stores the letters the user guessed
var currentWordIndex; // Index of the current word in the array
var guessingWord = []; // This will be the word we actually build to match the current word
var remainingGuesses = 0; // How many tries the player has left
var gameStarted = false; // Flag to tell if the game has started
var hasFinished = false; // Flag for 'press any key to try again'
var wins = 0; // How many win has the player racked up
var losses = 0; // How many lose has the player racked up

// Reset our game-level variables
function resetGame() {
  remainingGuesses = maxTries;
  gameStarted = false;

  // Use Math.floor to round the random number down to the nearest whole.
  currentWordIndex = Math.floor(Math.random() * champWords.length);

  // Clear out arrays
  guessedLetters = [];
  guessingWord = [];

  // Build the guessing word and clear it out
  for (var i = 0; i < champWords[currentWordIndex].length; i++) {
    guessingWord.push("_");
  }
  // Hide game over, win text, and to continue
  document.getElementById("gameover").innerHTML = " ";
  document.getElementById("youwin").innerHTML = " ";
  document.getElementById("continue").innerHTML = " ";

  // Show display
  updateDisplay();
}

//  Updates the display on the HTML Page
function updateDisplay() {
  document.getElementById("totalWins").innerText = wins;

  document.getElementById("totallosses").innerText = losses;

  document.getElementById("currentWord").innerText = " ";

  for (var i = 0; i < guessingWord.length; i++) {
    document.getElementById("currentWord").innerText += guessingWord[i];
  }
  document.getElementById("remainingGuesses").innerText = remainingGuesses;

  document.getElementById("guessedLetters").innerText = guessedLetters;

  if (remainingGuesses <= 0) {
    document.getElementById("gameover").innerHTML =
      "You have no more Guesses " +
      '<i class="fas fa-sad-tear fa-2x tear"></i>';
    document.getElementById("continue").innerHTML = "Press any Key to Continue";
    losses++;
    hasFinished = true;
  }
}

document.onkeydown = function(event) {
  // If we finished a game, dump one keystroke and reset.
  if (hasFinished) {
    resetGame();
    hasFinished = false;
  } else {
    // Check to make sure a-z was pressed.
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      makeGuess(event.key.toLowerCase());
    }
  }
};

function makeGuess(letter) {
  if (remainingGuesses > 0) {
    if (!gameStarted) {
      gameStarted = true;
    }

    // Make sure we didn't use this letter yet
    if (guessedLetters.indexOf(letter) === -1) {
      guessedLetters.push(letter);
      evaluateGuess(letter);
    }
  }

  updateDisplay();
  checkWin();
}

// This function takes a letter and finds all instances of
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
  // Array to store positions of letters in string
  var positions = [];

  // Loop through word finding all instances of guessed letter, store the indicies in an array.
  for (var i = 0; i < champWords[currentWordIndex].length; i++) {
    if (champWords[currentWordIndex][i] === letter) {
      positions.push(i);
    }
  }

  // if there are no indicies, remove a guess and update
  if (positions.length <= 0) {
    remainingGuesses--;
  } else {
    // Loop through all the indicies and replace the '_' with a letter.
    for (var i = 0; i < positions.length; i++) {
      guessingWord[positions[i]] = letter;
    }
  }
}

function checkWin() {
  if (guessingWord.indexOf("_") === -1) {
    document.getElementById("youwin").innerHTML =
      "You Winnn!!! " + '<i class="fas fa-smile-wink fa-2x wink"></i>';
    document.getElementById("continue").innerHTML = "Press any Key to Continue";
    wins++;
    hasFinished = true;
  }
}
// function myFunction() {
//     var x = document.getElementById("myDIV");
//     if (x.style.display === "none") {
//         x.style.display = "block";
//     } else {
//         x.style.display = "none";
//     }
// }
