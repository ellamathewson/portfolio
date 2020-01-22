/*
Things to implement:
    * Level changes
        * Flashlight size changes
        * Speed of worms change
        * Both ^
        * Worms fade in and out (change color to black)
        * Worm size changes
        * have to click for flashlight to catch them
        * A combo of any of these things
        * collide with one, another one appears
*/

"use strict"

/**
 * Ella Mathewson
 * Boogie worms dance across the screen in a randomized way. The 
 * user must use their cursor to catch them in the act of booging
 * before time runs out, and the worms get away with dancing their
 * five hearts out. 
 */

let circ; //flashlight object following mouse
let dancingQueens = []; //array for worms

let numWorms; //number of worms
let lightSize; //diameter of circle aka flashlight

let startButton; //button on opening screen

let hit = false; //collision

let begin = false; //used for displaying opening screen
let level;

let popupDivWin; //popupMenu for winning
let popupDivLose; //popupMenu for losing
let popupEndGame; //popupMenu for completing the game

let sw; //Stopwatch object
let swDisplay = true; //stopwatch boolean for display purposes

let finalScore; //val for score
let totalScoreArray = [];
let totalScore;

let timeOut; //limit on time for stopping worms

let wormSpeed;

let lightOn = false;

let themeSong;

let introSong;
let partOneSong;
let partTwoSong;

function preload() {
    introSong = loadSound('music/bensoundBadass.mp3');
    partOneSong = loadSound('music/workIt.wav');
    partTwoSong = loadSound('music/funkCity.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight - 10);
    background(0);

    themeSong = introSong;
    themeSong.play();
    //themeSong.loop();

    //defining vars
    level = 1;
    timeOut = 8;
    lightSize = 60;
    finalScore = 0;
    wormSpeed = 20;

    sw = new Stopwatch();

    //popupMenus
    popupDivWin = document.getElementById("popupBgWin");
    popupDivLose = document.getElementById("popupBgLose");
    popupEndGame = document.getElementById("popupBgEnd");

    //to display opening page
    if (begin == false) {
        startButton = createButton("Start");
        startButton.mouseClicked(startGame);
        startButton.position(width / 2, (height / 2) + (height / 3));
    }
}

function startGame() {
    begin = true;
    swDisplay = true;
    sw.start();

    musicChange();

    //    if (themeSong == introSong) {
    //        themeSong.pause();
    //    }

    themeSong.play();

    startButton.position(-100, -100); //gets rid of button that was used on home screen

    createCanvas(windowWidth, windowHeight - 10);
    background(0);

    levelChange();

    circ = new circleObj(lightSize);

    //creating the worms
    for (let i = 0; i < numWorms; i++) {
        let w = new WormObject(wormSpeed);
        dancingQueens.push(w);
    }
    //console.log(dancingQueens);
}

function draw() {
    if (begin == false) {
        //Home screen
        textSize(50);
        noStroke();

        frameRate(10);
        colorMode(HSB);

        background(0);

        let textColor = (random(360) + 100) % 360

        fill(textColor, 100, 100);
        text("Boogie Worms", (width / 2) - 150, 100);

        textSize(25);
        fill(0, 0, 100);
        text("The worms are booging! Catch them", (width / 2) - 200, (height / 2));
        text("with your flashlight before they boogie", (width / 2) - 200, (height / 2) + 50);
        text("their five hearts out!", (width / 2) - 105, (height / 2) + 100);

        textSize(15);
        text("Music: www.bensound.com; http://www.purple-planet.com", (width / 2) - 175, (height / 2) + 300);

    } else if (begin == true) {
        //Starts the game -- doesn't change back
        frameRate(20);
        background(0);

        //Displaying the worms
        for (let i = 0; i < dancingQueens.length; i++) {
            dancingQueens[i].display();
        }

        //had to seperate into the levels for reasons unknown, but it did not work with just one if/else statment checking for the level between 11 and 15
        if (level <= 5) {
            //Levels 1 - 5
            //Light siz decreases, worm number increases
            circ.disp(mouseX, mouseY);
            console.log("work bitch");
            for (let i = 0; i < dancingQueens.length; i++) {
                dancingQueens[i].collide(dancingQueens, i, lightSize, mouseX, mouseY);
            }
        } else if (5 < level && level <= 10) {
            //Levels 6 - 10
            //Speed and number of worms increase
            console.log("boigrhia");
            circ.disp(mouseX, mouseY);
            for (let i = 0; i < dancingQueens.length; i++) {
                dancingQueens[i].collide(dancingQueens, i, lightSize, mouseX, mouseY);
            }
        } else if (10 < level && level <= 15) {
            //Flashlight is just an outline -- have to click in order for it to catch the worms
            circ.clickDisplay(mouseX, mouseY);
            console.log(lightOn);
            if (mouseIsPressed) {
                for (let i = 0; i < dancingQueens.length; i++) {
                    dancingQueens[i].collide(dancingQueens, i, lightSize, mouseX, mouseY);
                }
            }
        } else if (15 < level && level <= 20) {
            //flashlight is mirrored from the location of the mouse cursor 
            console.log("arjek");
            circ.reverseDisplay(mouseX, mouseY);
            for (let i = 0; i < dancingQueens.length; i++) {
                dancingQueens[i].collide(dancingQueens, i, lightSize, mouseY, mouseX);
            }
        } else {
            //If all levels are completed, the game resorts back to simply decreasing the light size and increasing the number of worms
            console.log("infinity");
            circ.disp(mouseX, mouseY);
            for (let i = 0; i < dancingQueens.length; i++) {
                dancingQueens[i].collide(dancingQueens, i, lightSize);
            }
        }

        //Used before the light changed -- probably can delete
        //        for (let i = 0; i < dancingQueens.length; i++) {
        //            dancingQueens[i].display();
        //            dancingQueens[i].collide(dancingQueens, i, lightSize);
        //        }

        //If all the worms have been caught, open popupMenu win
        if (dancingQueens.length == 0) {
            openPopupMenuWin();
        }

        //If the time goes past the limit, and there are still worms, open popupMenu lose
        let timeLimit = sw.stop();
        if (timeLimit >= timeOut && dancingQueens.length > 0) {
            openPopupMenuLose();
        }

        //For displaying time on the popupMenu win
        if (dancingQueens.length == 0 && swDisplay == true) {
            sw.stop();

            //Write time on popupMenu
            document.getElementById("timeInsert").innerHTML = sw.ElapsedMilliseconds;

            calcScore();

            document.getElementById("scoreInsert").innerHTML = finalScore;
            
            addScore();
        
            console.log(totalScore);

            //Boolean used to ensure this only runs once because it is in the draw function. This was the solution to my problem where the time continued going even when stop was being called.
            swDisplay = false;
        }
    }
}

function addScore() {
    //adds score value to array
    totalScoreArray.push(finalScore);
    
    //adds the values in the array
    totalScore = totalScoreArray.reduce(getSum);
    
    //gets the total to print in html
    document.getElementById("finalScoreInsert").innerHTML = totalScore;


}

function getSum(total, num) {
    //adds the values in the array
    return total + num;
}

function openPopupMenuWin() {
    popupDivWin.style.display = "block";
    themeSong.pause();
    //console.log(themeSong);
}

function openPopupMenuLose() {
    popupDivLose.style.display = "block";
    themeSong.pause();
    //console.log(themeSong);
}

function endGamePopup() {
    popupEndGame.style.display = "block";
}

function closePopupMenuWin() {
    popupDivWin.style.display = "none";
    level += 1;

    if (level % 2) {
        timeOut += 5;
    }
    startGame();
}

function closePopupMenuLose() {
    popupDivLose.style.display = "none";
    startGame();
}

function reset() {
    //At the end of the game, used so game will restart from beginning
    popupEndGame.style.display = "none";
    background(0);
    begin = false;
    level = 1;
    startButton.position(width / 2, (height / 2) + (height / 3));
}

function calcScore() {
    finalScore = Math.floor((numWorms / sw.ElapsedMilliseconds) * 10);
    //arbitraury calculation of score
}

function levelChange() {
    let x = level;
    switch (true) {
        //reads the level and changes it
        case (x <= 5):
            dancingQueens = []; //resets worm array
            numWorms = level * 5; //calculates number of worms
            lightSize -= 5; //changes size of light
            console.log(level);
            break;
        case (x > 5 && x <= 10):
            dancingQueens = [];
            lightSize = 60; //sets light size to be static
            numWorms = (level - 5) * 10;
            wormSpeed += 5; //increases worm speed
            console.log(level);
            console.log(numWorms);
            break;
        case (x > 10 && x <= 15):
            //these levels are different bc the flashlight is different
            dancingQueens = [];
            wormSpeed = 10; //sets worm speed to be static
            numWorms = (level - 10) * 10;
            console.log("your moms a hoe");
            break;
        case (x > 15 && x <= 20):
            dancingQueens = [];
            wormSpeed = 10;
            numWorms = (level - 15) * 10;
            console.log("wig snatched");
            break;
        case (x == 21):
            //ends the game
            dancingQueens = [];
            endGamePopup();
            break;
        default:
            //in case anything goes wrong, the normal progression will be a smaller light size and more worms
            dancingQueens = [];
            numWorms = level * 10;
            lightSize -= 3;
            console.log(level);
            break;
    }
}

function musicChange() {
    let x = level;
    switch (true) {
        //reads the level and changes it
        case (x <= 5):
            themeSong.pause();
            themeSong = partOneSong;
            console.log("partone");
            break;
        case (x > 5 && x <= 10):
            themeSong.pause();
            themeSong = partTwoSong;
            console.log("parttwo");
            break;
        case (x > 10 && x <= 15):
            themeSong.pause();
            themeSong = partOneSong;
            break;
        case (x > 15 && x <= 20):
            themeSong.pause();
            themeSong = partTwoSong;
            break;
        case (x == 21):
            themeSong.pause();
            themeSong = introSong;
            break;
        default:
            themeSong.pause();
            themeSong = introSong;
            console.log("intro song bitch");
            break;
    }
}




//    if (level <= 5) {
//        dancingQueens = []; //resets worm array
//        numWorms = level * 10; //calculates number of worms
//        lightSize -= 5; //changes size of light
//        console.log(level);
//    } else if (5 < level <= 10) {
//        dancingQueens = [];
//        lightSize = 60; //sets light size to be static
//        numWorms = (level - 5) * 10;
//        wormSpeed += 5; //increases worm speed
//        console.log(level);
//        console.log(numWorms);
//    } else if (10 < level <= 15) {
//        dancingQueens = [];
//        wormSpeed = 10; //sets worm speed to be static
//        numWorms = 20;
//        console.log("your moms a hoe");
//    } else if (level == 16) {
//        dancingQueens = [];
//        endGamePopup();
//    } else {
//        dancingQueens = [];
//        numWorms = level * 10;
//        lightSize -= 3;
//        console.log(level);
//    }


//    if (level <= 5) {
//        dancingQueens = [];
//        numWorms = level * 10;
//        lightSize -= 10;
//    } else if (5 < level <= 10) {
//        dancingQueens = [];
//        numWorms = (level - 5) * 10;
//        wormSpeed += 5;
//    } else if (10 < level <= 15) {
//        dancingQueens = [];
//        numWorms = (level - 10) * 10;
//        console.log("numWorms");
//    }

/* 
CREDITS:
Music: www.bensound.com
Music: http://www.purple-planet.com
    
*/
