//THIS IS THE CODE I  WRITE WHILE MAKING THIS GAME FOR THE FIRST TIME
console.log("jai shree ram!");



let userClickedPattern =[];
console.log(userClickedPattern);

let gamePattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour = buttonColours[nextSequence()];
console.log(randomChosenColour);

gamePattern.push(randomChosenColour);
// console.log(gamePattern);

function nextSequence() {
    let n = Math.random();
    n = n * 4;
    let randomNumber = Math.floor(n);
    return randomNumber;
    console.log(randomNumber);
}
function handler(event) {
    let userChosenColour  = event.target.id;
    userClickedPattern.push(userChosenColour);
    sound(userChosenColour);
    console.log(userClickedPattern);
    // console.log(userChosenColour);
}



$(".btn").click(handler);


function animations() {
    $("#" + randomChosenColour).addClass("pressed");
    setTimeout(() => {
        $("#" + randomChosenColour).removeClass("pressed");
    }, 100);
    console.log("animation played")
}
function sound(name) {
    let sound = new Audio('sounds/'+ name +'.mp3');
    sound.play();
}
function soundAndAnimation(randomChosenColour) {
    switch (randomChosenColour) {
        case "green":
            animations();
            // let green = new Audio('sounds/green.mp3');
            // green.play();
            sound(green);
            break;
        case "red":
            animations();
            sound(red);
            break;
        case "yellow":
            animations(yellow);
           sound();
            break;
        case "blue":
            animations(blue);
            sound();
            break;

        default:
            break;
    }

}

function pressKeyToStart() {
    $("#level-title").text("level 1");
    soundAndAnimation(randomChosenColour);
    setTimeout(() => {
        document.removeEventListener("keyup" , pressKeyToStart);
    }, 100);
}
document.addEventListener("keyup" , pressKeyToStart);
