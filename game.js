var buttonColors = ["red", "green", "yellow", "blue"];
var userClickedPattern = [];
var gamePattern = [];
alert("Information \nThe Rules of the Game are that you have to remember the PREVIOUSLY STORED PATTERN and move forward with a growing pattern at every level !");
var started=false;
var level=0;

$("#starting").click(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log("UserClickedPattern");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            $("#score").text(" Current Score : " + level*10);
            $("#score").css({"font-weight": "bold", "font-size": "32px"});
        }
    }
    else {
        playSound("fail");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over ! Press Start Key to Play Again");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#score").text("Current Score: 0");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [ ];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
var audio = new Audio("sounds/" + name + ".mp3");
audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}
