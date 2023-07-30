let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

// Function to play the sound for a given color
function playSound(color) {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

// Function to animate the button when clicked
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 10);
}

// Function to start the game and generate the next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Show the pattern to the user with animations and sounds
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Function to handle user clicks and check their input against the game pattern
$(".btn").click(function () {
  if (started) {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});

// Function to check if the user's input matches the game pattern
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// Function to start the game when a key is pressed
$(document).keydown(function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});

// Function to reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
