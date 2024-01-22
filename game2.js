//THIS IS THE FINALISED GAME JS CODE, AND I LEARNED A LOT OF NEW CONCEPTS WHILE WORKING ON IT
console.log("jai shree ram");
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];

let level = 0;
let start = false;
let MaximumScore = 0;
let gamePattern = [];

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("level " + level);

    let randomNumber = Math.floor((Math.random() * 4));
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}


//better way of doing calling event listener for once 
if (MaximumScore == 0) {
    $("#Max-score").text(("Highest Score: 0"));
}


document.addEventListener("keyup", () => {
    if (!start) {
        $(".btn").click(handler);
        function handler(event) {
            let userChosenColour = event.target.id;//THIS NOT WORK HERE AND I FOUND AOUT THAT .TARGET METHOD WORKS WELL
            userClickedPattern.push(userChosenColour);
            // console.log(userClickedPattern);
            playSound(userChosenColour);
            animatePress(userChosenColour);
            checkAnswer(userClickedPattern.length - 1);
        }
        nextSequence();
        start = true;
    }
})

document.addEventListener("touchend", () => {
    if (!start) {
        $(".btn").touchend(handler);
        function handler(event) {
            let userChosenColour = event.target.id;//THIS NOT WORK HERE AND I FOUND AOUT THAT .TARGET METHOD WORKS WELL
            userClickedPattern.push(userChosenColour);
            // console.log(userClickedPattern);
            playSound(userChosenColour);
            animatePress(userChosenColour);
            checkAnswer(userClickedPattern.length - 1);
        }
        nextSequence();
        start = true;
    }
})


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("success");
        if (userClickedPattern.length === gamePattern.length) {//TO TRACK ALL THE PREVIOUS MATCHINGS BCZ ONLY CHECKING THE LAST ONE IS NOT TRUE
            //WAHT IF THE PLAYER DID NOT GO THROUGH THE PATTERN 
            setTimeout(() => {
                nextSequence();

            }, 1000);
        }
    }
    else {
        let wrong = "wrong";
        playSound(wrong);
        //CALLING AN EVENT LISTNER ONCE
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);
        $("h1").text("Game Over , press any key to restart");
        //FOR CALLING A EVENT LISTNER JUST ONCE 
        $(document).one('keyup', () => {
            startOver();  // startOver will only be called Once
        });
        if (level > MaximumScore) {
            MaximumScore = level - 1;
            localStorage.setItem("MaximumScore", MaximumScore);

            $("#Max-score").text("Highest Score: " + localStorage.getItem("MaximumScore"));
            let highestScore = localStorage.getItem("MaximumScore");
            if (MaximumScore > highestScore) {
                MaximumScore = highestScore;
                $("#Max-score").text("Highest Score: " + localStorage.getItem("MaximumScore"));
            }
        };

    };
}

function startOver() { //RESETTING ALL THE PARAMETRS 
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
}





function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}




function playSound(name) {
    let sound = new Audio('sounds/' + name + '.mp3');
    sound.play();

}