//array of available words 

var availableWords = ["pizza", "spaghetti", "sandwich", "bagel", "taco", "burger"];
var currentWord = [];
var currentWordIndex;
var maxGuesses = 10;
var lettersGuessed = [];
var remainingGuesses;
var gameStarted = false;
var gameOver = false;
var wins = 0;



//Start game

function startGame () {
    remainingGuesses = maxGuesses;
    gameStarted = true;


//Choose a word for the game from given array 

currentWordIndex = Math.floor(Math.random() * (availableWords.length));

//reset the game
lettersGuessed = [];
currentWord = [];

// document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
// document.getElementById("gameover-image").style.cssText = "display: none";
// document.getElementById("youwin-image").style.cssText = "display: none";

//Print spaces to the page (one for every letter in the word)
for (var i=0; i < availableWords[currentWordIndex].length; i++) {
    currentWord.push("_");
}

updateGame();
};


function updateGame() {

    document.getElementById("totalWins").innerText = wins;

    for (var i = 0; i < currentWord.length; i++) {
        document.getElementById("currentWord").innerText += currentWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;
    // if(remainingGuesses <= 0) {
    //     document.getElementById("gameover-image").style.cssText = "display: block";
    //     document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
    //     gameOver = true;
    // }
};


document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(gameOver) {
        startGame();
        gameOver = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            Guess(event.key.toLowerCase());
        }
    }
};

function Guess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        // Make sure we didn't use this letter yet
        if (lettersGuessed.indexOf(letter) === -1) {
            lettersGuessed.push(letter);
            fileGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};

// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function fileGuess(letter) {
    // Array to store letterPosition of letters in string
    var letterPosition = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < availableWords[currentWordIndex].length; i++) {
        if(availableWords[currentWordIndex][i] === letter) {
            letterPosition.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (letterPosition.length <= 0) {
        remainingGuesses--;
        updateHangmanImage();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < letterPosition.length; i++) {
            currentWord[letterPosition[i]] = letter;
        }
    }
};
//repeat the following until the chosen word is completed or lives equals 0



//Listen to the user's keypress

//search an alphabet array for a match

//return the selected letter 

//search the chosen word for the letter 

//if the letter is in the chosen word, search the word for letter position

//display the letter in place of the empty space

//if the letter is not in the chosen word, print the letter to the screen below the game 

//decrease lives by 1

//if lives equals 0, display, You Lose!

//if word is completed, display, You Win! 

//reset counter and word if user presses 'play again' 

