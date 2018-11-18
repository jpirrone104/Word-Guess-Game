//array of available words 

var availableWords = ["beryl", "jadeite", "nephlyte", "zoisite", "malachite","metalia"];
var currentWord = [];
var currentWordIndex;
var lettersGuessed = [];
var remainingLives = 0;
var gameStarted = false;
var gameOver = false;
var wins = 0;



//Start game

function startGame () {
    remainingLives = 10;
    gameStarted = true;
    wins = 0;


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
    var currentWordString = "";
    for (var i = 0; i < currentWord.length; i++) {
        currentWordString += currentWord[i];
    }
    
    document.getElementById("currentWord").innerText = currentWordString;
    document.getElementById("remainingLives").innerText = remainingLives;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;
    // if(remainingLives <= 0) {
    //     document.getElementById("gameover-image").style.cssText = "display: block";
    //     document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
    //     gameOver = true;
    // }
};

function findLetter(letter) {
    // Array to store letterPosition of letters in string
    var letterPosition = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < availableWords[currentWordIndex].length; i++) {
        if(availableWords[currentWordIndex][i] === letter) {
            letterPosition.push(i);
        }
    }

    if (letterPosition.length <= 0) {
        remainingLives--;
        
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < letterPosition.length; i++) {
            currentWord[letterPosition[i]] = letter;
        }
    }
};

function Guess(letter) {
    if (remainingLives > 0) {

        // Make sure we didn't use this letter yet
        if (lettersGuessed.indexOf(letter) === -1) {
            lettersGuessed.push(letter);
            findLetter(letter);
        }
    }
    
    updateGame();

};
function checkWin() {
    if(currentWord.indexOf("_") === -1 ) {
        // document.getElementById("youwin-image").style.cssText = "display: block";
        // document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins = 1;
        gameOver = true;
        
    }
    else if (remainingLives == 0) {
        gameOver = true;

    }
    
    
};




// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.


    // if there are no indicies, remove a guess and update the hangman image
   
document.onkeydown = function(event) {
    
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            Guess(event.key.toLowerCase());
            updateGame();
            checkWin();
            console.log(gameOver);
        }
        else if (event.keyCode >= 65 && event.keyCode <= 90) {
            
        }

        if(event.keyCode == 13) {
            startGame();
            console.log(gameOver);
        }
        

};


