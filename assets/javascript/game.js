//array of available words 

var availableWords = ["beryl", "jadeite", "nephlyte", "zoisite", "malachite","metalia"];
var currentWord = [];
var currentWordIndex;
var lettersGuessed = [];
var remainingLives = 0;
var gameStarted = false;
var gameOver = false;
var wins = 0;

var startSound = new Audio("./assets/soundfiles/defeat.wav");
var loseSound = new Audio("./assets/soundfiles/zoisitelaugh.wav");
var winSound = new Audio("./assets/soundfiles/berylgone.wav");

//Start game

function startGame () {
    startSound.play();
    remainingLives = 10;
    gameStarted = true;
    gameOver = false;
    wins = 0;


//Choose a word at random from the array of available words

currentWordIndex = Math.floor(Math.random() * (availableWords.length));

//Reset Game Arrays and Images
lettersGuessed = [];
currentWord = [];

document.getElementById("winimage").style.cssText = "display: none";
document.getElementById("loseimage").style.cssText = "display: none";
document.getElementById("losemessage").style.cssText = "display: none";
document.getElementById("winmessage").style.cssText = "display: none";
document.getElementById("gamecontainer").style.cssText = "display: block";

    clearSolution();

//Print blank spaces to the page
for (var i=0; i < availableWords[currentWordIndex].length; i++) {
    currentWord.push("_");
}

updateGame();

    function clearSolution() {
        document.getElementById("solution").innerHTML = "";
    }
};

//Display the game to the player
function updateGame() {

    
    var currentWordString = "";
    for (var i = 0; i < currentWord.length; i++) {
        currentWordString += currentWord[i];
    }
    
    document.getElementById("currentWord").innerText = currentWordString;
    document.getElementById("remainingLives").innerText = remainingLives;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;
   

};

//Find the letter in the current word
function findLetter(letter) {
    // Array used to store the letters for the game
    var letterPosition = [];

    // Loop through the current word and push the indices into the letterPosition array 
    for (var i = 0; i < availableWords[currentWordIndex].length; i++) {
        if(availableWords[currentWordIndex][i] === letter) {
            letterPosition.push(i);
        }
    }

    //Decrement remaining lives if the selected letter does not find a match
    if (letterPosition.length <= 0) {
        remainingLives--;
        
    } else {
        // Loop through letters, replace the spaces with the letter if a match exists
        for(var i = 0; i < letterPosition.length; i++) {
            currentWord[letterPosition[i]] = letter;
            //increment correct guesses counter
            wins++;
            console.log(wins);
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
    //Evaluate wins counter and word length to look for a match
    if(availableWords[currentWordIndex].length == wins) {
        //Put the win image on the screen
        document.getElementById("winimage").style.cssText = "display: block";
        document.getElementById("winmessage").style.cssText = "display: block";
        document.getElementById("solution").innerHTML = "You defeated " + availableWords[currentWordIndex] + "!";
        document.getElementById("gamecontainer").style.cssText = "display: none";
        gameOver = true;
        winSound.play();
        
    }
    //Evaluate remaining lives counter to see if a loss exists
    else if (remainingLives == 0) {
        console.log(availableWords[currentWordIndex]);
        //Put the lose image on the screen
       
        document.getElementById("loseimage").style.cssText = "display: block";
        document.getElementById("losemessage").style.cssText = "display: block";
        document.getElementById("solution").innerHTML = availableWords[currentWordIndex] + " defeated you!";
        document.getElementById("gamecontainer").style.cssText = "display: none";
        gameOver = true;
        loseSound.play();
    }

};




 // Evaluate keypresses
   
document.onkeydown = function(event) {
    

    
        // Listen for A-Z
        if(event.keyCode >= 65 && event.keyCode <= 90 && gameOver !== true) {
            Guess(event.key.toLowerCase());
            updateGame();
            checkWin();
            console.log(gameOver);
        }

        // Lisetn for 'Enter' key

        if(event.keyCode == 13) {
            startGame();
            console.log(gameOver);
        }
    


};


