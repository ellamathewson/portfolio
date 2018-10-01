/*
Ella Mathewson; 11/14/17; IGME-101: Project 2

'The Munchies' is a game where you help a penguin move around on screen to eat fish and avoid rocks. 
*/

"use strict"

//image vars
let imageOfAnimal, imageOfFood, imgPenguin, imgFish, imgDino, imgMeat, imgPig, imgCorn, imgRock;

//object var
let animal, food;
let foodArray = [];
let obstacleArray = [];

//location vars
let locationX, locationY, foodX, foodY, obstX, obstY;

//var width and height
let animalSize, foodWidth, foodHeight;

//checkEdges var
let bottomAndRightEdge;

let themeSelect;

//button vars
let penguinButton, dinoButton, pigButton, timeButton, addButton;

//var for number of fish
let fishNumber, numOfFood, numOfObstacles;

//style vars
let backgroundColor;

//score vars
let score, resetScore, level, timeValue, go;

//canvas location 
let cnv;
let posX;
let posY;

function preload() {
    imgPenguin = loadImage("photos/imgPenguin.png");
    imgFish = loadImage("photos/imgFish.png");
    imgDino = loadImage("photos/imgDino.png");
    imgMeat = loadImage("photos/imgMeat.png");
    imgPig = loadImage("photos/imgPig.png");
    imgCorn = loadImage("photos/imgCorn.png");
    imgRock = loadImage("photos/imgRock.png");
}

function centerCanvas() {
    posX = (windowWidth - width) / 2;
    posY = ((windowHeight - height) / 2) + 150;
    console.log(posX, posY);
    cnv.position(posX, posY);
}

function setup() {
    //initalizing vars
    backgroundColor = "#46B1D5"
    
    //creating the canvas and positioning it
    cnv = createCanvas(725, 600);
    cnv.position(posX, posY);
    background(backgroundColor);
    centerCanvas();
    
    //initialzing the position of the animal
    locationX = 525;
    locationY = 525;
    
    //image sizes
    animalSize = 60;
    foodWidth = 40;
    foodHeight = 20;
    
    //For the border
    bottomAndRightEdge = 540;
    
    //initializes objects and number of objects
    imageOfAnimal = imgPenguin;
    imageOfFood = imgFish;
    numOfFood = 5;
    numOfObstacles = 2;
    
    //what
    obstX = 50;
    obstY = 50;
    
    //initializes score and level
    score = 0;
    level = 1;
    
    //initializes time level
    timeValue = 9000;
    
    //time is not running
    go = false;
    
    //creating buttons
    timeButton = createButton("Start");
    timeButton.position(635 + posX, 275 + posY);
    timeButton.mouseClicked(startGame);

    //Changing the theme
    themeSelect = createSelect();
    themeSelect.position(625 + posX, 125 + posY);
    themeSelect.option('Artic');
    themeSelect.option('Jurassic');
    themeSelect.option('Farm');
    themeSelect.changed(changeTheme);

    //makes food and obstacles 
    makeFood();
    makeObstacles();
}

function windowResized() {
    centerCanvas();
    timeButton.position(635 + posX, 275 + posY);
    themeSelect.position(625 + posX, 125 + posY);
}

function draw() {
    //refreshes the backgound so objects can disappear and change
    background(backgroundColor);

    //colliding with the food
    for (let i = 0; i < foodArray.length; i++) {
        foodArray[i].display();
        if (foodArray[i].collide(locationX, locationY, animalSize) == true) {
            score++;
        }
        foodArray[i].relocate(locationX, locationY, animalSize);
    }

    //colliding for obstacles
    for (let i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].display();
        if (obstacleArray[i].collide(locationX, locationY, animalSize) == true) {
            score--;
        }
        obstacleArray[i].relocate(locationX, locationY, animalSize);
    }

    //text on sidebar
    fill(255);
    textSize(25);
    textSize(15);
    text("Gather food and", 605, 25);
    text("avoid the rocks!", 605, 50);
    text("Use w, a, s, & d ", 605, 75);
    text("to move", 605, 100);
    
    textSize(28);
    text("Level: " + level, 604, 200);
    text("Score: " + score, 602, 240);
    

    animal = new movingObject(locationX, locationY, animalSize, imageOfAnimal);

    animal.display(imageOfAnimal);

    borders();
    checkEdges();
    displayGo();

    //move left
    if (keyIsDown(65)) {
        animal.moveLeft();
        locationX -= 3;
    }
    //going right
    if (keyIsDown(68)) {
        animal.moveRight();
        locationX += 3;
    }
    //going up
    if (keyIsDown(87)) {
        animal.moveUp();
        locationY -= 3;
    }
    //going down
    if (keyIsDown(83)) {
        animal.moveDown();
        locationY += 3;
    }
}

function startGame() {
    setTimeout(timeLimit, timeValue);
    go = true;
}

function changeTheme() {
    let option = themeSelect.value();
    switch (option) {
        case 'Artic':
            imageOfAnimal = imgPenguin;
            imageOfFood = imgFish;
            animalSize = 60;
            backgroundColor = "#46B1D5";
            bottomAndRightEdge = 540;
            break;
        case 'Jurassic':
            imageOfAnimal = imgDino;
            imageOfFood = imgMeat;
            animalSize = 70;
            backgroundColor = "#496843";
            bottomAndRightEdge = 520;
            break;
        case 'Farm':
            imageOfAnimal = imgPig;
            imageOfFood = imgCorn;
            animalSize = 80;
            backgroundColor = "#BB9646";
            bottomAndRightEdge = 510;
            break;
        default:
            imageOfAnimal = imgPenguin;
            imageOfFood = imgFish;
            animalSize = 60;
            backgroundColor = "#46B1D5";
            bottomAndRightEdge = 540;
            break;
    }
}

function levelUp() {
    if (level == 5) {
        level = 5;
        //reset();
    } else {
        level++;
        addingLevels();
        makeFood();
        makeObstacles();
    }
}

function mouseClicked() {
    //changing the image of the food
    for (let i = 0; i < foodArray.length; i++) {
        foodArray[i].changeImage(imageOfFood);
    }
}

function timeLimit() {
    alert("Out of time! Your score is: " + score);
    score = 0;
    go = false;
    levelUp();
}

function displayGo() {
    if (go == true) {
        textSize(30);
        fill("red");
        text("Go!", 640, 350);
    }
}

function makeFood() {
    for (let i = 0; i < numOfFood; i++) {
        foodX = random(10, 550);
        foodY = random(10, 550);
        foodArray.push(new foodObject(foodX, foodY, foodWidth, foodHeight, imageOfFood));
    }
}

function makeObstacles() {
    for (let i = 0; i < numOfObstacles; i++) {
        obstX = random(10, 525);
        obstY = random(10, 525);
        obstacleArray.push(new Obstacle(obstX, obstY, 65, 65, imgRock));
    }
}

//changing the values when increasing level
function addingLevels() {
    switch (level) {
        case 1:
            numOfFood = 8;
            numOfObstacles = 1;
            timeValue = 15000;
            break;
        case 2:
            numOfFood = 6;
            numOfObstacles = 3;
            timeValue = 13000;
            break;
        case 3:
            numOfFood = 4;
            numOfObstacles = 5;
            timeValue = 11000;
            break;
        case 4:
            numOfFood = 2;
            numOfObstacles = 7;
            timeValue = 9000;
            break;
        case 5:
            numOfFood = 1;
            numOfObstacles = 35;
            timeValue = 5000;
            break;
        default:
            numOfFood = 8;
            numOfObstacles = 1;
            timeValue = 15000;
            break;
    }
}

//object cant go beyond borders
function checkEdges() {
    if (locationX >= bottomAndRightEdge) {
        locationX = bottomAndRightEdge;
    }
    else if (locationX <= 0) {
        locationX = 0;
    }
    else if (locationY >= bottomAndRightEdge) {
        locationY = bottomAndRightEdge;
    }
    else if (locationY < 0) {
        locationY = 0;
    }
}

//borders to the game
function borders() {
    fill(0);
    noStroke();
    //left border
    rect(0, 0, 10, 600);
    //top border
    rect(0, 0, 600, 10);
    //right border
    rect(590, 0, 10, 600);
    //bottom border
    rect(0, 590, 600, 10);
}
