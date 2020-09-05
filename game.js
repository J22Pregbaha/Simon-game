var userClickedPattern = []; //array to store the click pattern of the user

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = []; //array to store the pattern set by the game

var gameStarted = false; //variable to store whether a new game has started

var level = 0; //variable to store current level

// Function that shows the next box in the sequence
function nextSequence() {
	var randomNumber = Math.floor(Math.random() * 4); //select random number between 1 and 3
	
	var randomChosenColor = buttonColors[randomNumber]; //select random color from colors in array
	gamePattern.push(randomChosenColor); //add it to the game pattern

	$("#" + randomChosenColor).fadeOut(250).fadeIn(250); //show the user the color  selected by making th box blink

	playSound(randomChosenColor); //play the sound of the box as it blinks

	userClickedPattern = []; //reset the user clicked pattern so the user can start the sequence all over

	level++; //increase the game level

	$("#level-title").text("Level " + level); //update the page to show the user the current level
}

$(document).on("keydown", function() { //check if user has pressed any key
	
	if (!gameStarted) { //check to be sure the game hasn't already started because key press should only start new game when there isn't an existing game
		nextSequence(); //show the user the next box in the sequence
		gameStarted = true; //let the program know that a game has already been started so as to disable starting new game on key press
	}

});

$(document).on("click", function() { //check if user has clicked on the body (for mobile)

	if (!gameStarted) { //check to be sure the game hasn't already started because key press should only start new game when there isn't an existing game
		nextSequence(); //show the user the next box in the sequence
		gameStarted = true; //let the program know that a game has already been started so as to disable starting new game on key press
	}

});

// Function to play sounds
function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

$(".btn").on("click", function() { //check if any box has been clicked
	var userChosenColor = this.id; //get the id (which is the color of the box) of the button clicked 
	playSound(userChosenColor); //play the sound related to that box
	
	userClickedPattern.push(userChosenColor); //add this color to the user clicked pattern
	
	animatePress(userChosenColor); //let the user know that the button has been clicked

	var lastIndex = userClickedPattern.length - 1; //get the position of the last color that the user clicked
	checkAnswer(lastIndex); //check if the answer in that position in the user clicked pattern is equal to the one in the game pattern
});

// Function to animate the pressed button
function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function() {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

// Function to check that the answer is correct
function checkAnswer(currentLevel) {
	console.log(gamePattern[currentLevel]);
	console.log(userClickedPattern[currentLevel]);

	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { //if statement to check if the color in each position of the user clicked pattern and game pattern are the same
		console.log("correct");

		if (userClickedPattern.length === gamePattern.length) { //if statement to check if user has finished the pattern and continue to the next sequence
			setTimeout(function() {
				nextSequence();
			}, 1000);
		}

	} else {
		console.log("wrong");

		$("body").addClass("game-over");
		setTimeout(function() {
			$("body").removeClass("game-over");
		}, 200);

		$("#level-title").text("Game Over, Press Any Key or Click Anywhere to Restart");

		playSound("wrong");

		startOver();
	}
}

// Function to start over by resetting all values
function startOver() {
	level = 0;
	gamePattern = [];
	gameStarted = false;
}