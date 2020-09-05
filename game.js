var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var gameStarted = false;

var level = 0;

function nextSequence() {
	var randomNumber = Math.floor(Math.random() * 4);
	
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);

	$("#" + randomChosenColor).fadeOut(250).fadeIn(250); 

	playSound(randomChosenColor);

	userClickedPattern = [];

	level++;

	$("#level-title").text("Level " + level);
}

$(document).on("keydown", function() {
	if (!gameStarted) {
		nextSequence();
		gameStarted = true;
		$("#level-title").text("Level " + level);
	}
});

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

$(".btn").on("click", function() {
	var userChosenColor = this.id;
	playSound(userChosenColor);
	
	userClickedPattern.push(userChosenColor);
	
	animatePress(userChosenColor);

	lastIndex = userClickedPattern.length - 1;
	checkAnswer(lastIndex);
});

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function() {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	console.log(gamePattern[currentLevel]);
	console.log(userClickedPattern[currentLevel]);

	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		console.log("correct");

		if (userClickedPattern.length === gamePattern.length) {
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

		$("#level-title").text("Game Over, Press Any Key to Restart");

		playSound("wrong");

		startOver();
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
	gameStarted = false;
}