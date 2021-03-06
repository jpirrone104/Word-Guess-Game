//array of available words 

var villians = ["beryl", "jadeite", "nephlyte", "zoisite", "malachite","metalia"];
var currentVillian = [];
var villianInPlay;
var lettersGuessed = [];
var remainingLives = 0;
var wins = 0;
var gameStarted = false;
var gameOver = false;


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




//Reset Game Arrays and Images
lettersGuessed = [];
currentVillian = [];

document.getElementById("winimage").style.cssText = "display: none";
document.getElementById("loseimage").style.cssText = "display: none";
document.getElementById("losemessage").style.cssText = "display: none";
document.getElementById("winmessage").style.cssText = "display: none";
document.getElementById("gamecontainer").style.cssText = "display: block";

    clearSolution();

//Choose a word at random from the array of available words
villianInPlay = Math.floor(Math.random() * (villians.length));

//Print blank spaces to the page
for (var i=0; i < villians[villianInPlay].length; i++) {
    currentVillian.push("_");
}

updateGame();

    function clearSolution() {
        document.getElementById("solution").innerHTML = "";
    }
};

//Display the game to the player
function updateGame() {

    
    var currentVillianString = "";
    for (var i = 0; i < currentVillian.length; i++) {
        currentVillianString += currentVillian[i];
    }
    
    document.getElementById("currentVillian").innerText = currentVillianString;
    document.getElementById("remainingLives").innerText = remainingLives;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;
   

};

//Find the letter in the current word
function findLetter(letter) {
    // Array used to store the letters for the game
    var guessedLetter = [];

    // Loop through the current word and push the indices into the guessedLetter array 
    for (var i = 0; i < villians[villianInPlay].length; i++) {
        if(villians[villianInPlay][i] === letter) {
            guessedLetter.push(i);
        }
    }

    //Decrement remaining lives if the selected letter does not find a match
    if (guessedLetter.length <= 0) {
        remainingLives--;
        
    } else {
        // Loop through letters, replace the spaces with the letter if a match exists
        for(var i = 0; i < guessedLetter.length; i++) {
            currentVillian[guessedLetter[i]] = letter;
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
function winOrLose() {
    //Evaluate wins counter and word length to look for a match
    if(villians[villianInPlay].length == wins) {
        //Put the win image on the screen
        document.getElementById("winimage").style.cssText = "display: block";
        document.getElementById("winmessage").style.cssText = "display: block";
        document.getElementById("solution").innerHTML = "You defeated " + villians[villianInPlay] + "!";
        document.getElementById("gamecontainer").style.cssText = "display: none";
        gameOver = true;
        winSound.play();
        
    }
    //Evaluate remaining lives counter to see if a loss exists
    else if (remainingLives == 0) {
        console.log(villians[villianInPlay]);
        //Put the lose image on the screen
       
        document.getElementById("loseimage").style.cssText = "display: block";
        document.getElementById("losemessage").style.cssText = "display: block";
        document.getElementById("solution").innerHTML = villians[villianInPlay] + " defeated you!";
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
            winOrLose();
            console.log(gameOver);
        }

        // Lisetn for 'Enter' key

        if(event.keyCode == 13) {
            startGame();
            console.log(gameOver);
        }
    


};