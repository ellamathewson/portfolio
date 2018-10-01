/*
Ella Mathewson; 11/14/17; IGME-101: Project 2
*/

"use strict"

//image vars
var imageOfAnimal, imageOfFood, imgPenguin, imgFish, imgDino, imgMeat, imgPig, imgCorn, imgRock;

//object var
var animal, food;
var foodArray = [];
var obstacleArray = [];

//location vars
var locationX, locationY, foodX, foodY, obstX, obstY;

//var width and height
var animalSize, foodWidth, foodHeight;

//checkEdges var
var bottomAndRightEdge;

//button vars
var penguinButton, dinoButton, pigButton, timeButton, addButton;

//var for number of fish
var fishNumber, numOfFood, numOfObstacles;

//style vars
var backgroundColor;

//score vars
var score, resetScore, level, timeValue, go;

function preload() {
    imgPenguin = loadImage("photos/imgPenguin.png");
    imgFish = loadImage("photos/imgFish.png");
    imgDino = loadImage("photos/imgDino.png");
    imgMeat = loadImage("photos/imgMeat.png");
    imgPig = loadImage("photos/imgPig.png");
    imgCorn = loadImage("photos/imgCorn.png");
    imgRock = loadImage("photos/imgRock.png");
}

function setup() {
    //initalizing vars
    backgroundColor = "#46B1D5"
    locationX = 525;
    locationY = 525;
    animalSize = 60;
    foodWidth = 40;
    foodHeight = 20;
    bottomAndRightEdge = 540;
    imageOfAnimal = imgPenguin;
    imageOfFood = imgFish;
    numOfFood = 5;
    numOfObstacles = 2;
    obstX = 50;
    obstY = 50;
    score = 0;
    level = 1;
    timeValue = 9000;
    go = false;

    createCanvas(750, 600);
    background(backgroundColor);

    //creating buttons
    timeButton = new Button(635, 100, 75, 50, "white", "green", "purple", "black", "Start");
    penguinButton = new Button(635, 350, 75, 50, "white", "#FF7F2A", "purple", "black", "Arctic");
    dinoButton = new Button(635, 430, 75, 50, "white", "#ABD5AD", "purple", "black", "Jurassic");
    pigButton = new Button(635, 505, 75, 50, "white", "pink", "purple", "black", "Farm");
    addButton = new Button(615, 250, 125, 50, "white", "yellow", "green", "black", "Increase Level");

    makeFood();
    makeObstacles();
}

function draw() {
    background(backgroundColor);

    penguinButton.drawButton(mouseX, mouseY);
    timeButton.drawButton(mouseX, mouseY);
    dinoButton.drawButton(mouseX, mouseY);
    pigButton.drawButton(mouseX, mouseY);
    addButton.drawButton(mouseX, mouseY);

    //colliding for food
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
    text("Score: " + score, 675, 175);

    textSize(15);
    text("Gather food, and", 675, 15);
    text("avoid the rocks!", 675, 40);
    text("Level: " + level, 675, 225);
    text("Worlds:", 675, 325);

    animal = new movingObject(locationX, locationY, animalSize, imageOfAnimal);

    animal.display(imageOfAnimal);

    borders();
    checkEdges();
    displayGo();

    //move left
    if (keyIsDown(LEFT_ARROW)) {
        animal.moveLeft();
        locationX -= 3;
    }
    //going right
    if (keyIsDown(RIGHT_ARROW)) {
        animal.moveRight();
        locationX += 3;
    }
    //going up
    if (keyIsDown(UP_ARROW)) {
        animal.moveUp();
        locationY -= 3;
    }
    //going down
    if (keyIsDown(DOWN_ARROW)) {
        animal.moveDown();
        locationY += 3;
    }
}

function mouseClicked() {
    //time button
    if (mouseX > 635 && mouseX < 710 && mouseY > 100 && mouseY < 150) {
        setTimeout(timeLimit, timeValue);
        go = true;
    }
    //plus button
    if (mouseX > 615 && mouseX < 740 && mouseY > 250 && mouseY < 300) {
        if (level == 5) {
            level = 5;
        } else {
            level++;
            addingLevels();
            makeFood();
            makeObstacles();
        }
    }
    //artic button
    if (mouseX > 635 && mouseX < 710 && mouseY > 350 && mouseY < 400) {
        imageOfAnimal = imgPenguin;
        imageOfFood = imgFish;
        animalSize = 60;
        backgroundColor = "#46B1D5";
        bottomAndRightEdge = 540;
    }
    //jurrasic button
    if (mouseX > 635 && mouseX < 710 && mouseY > 430 && mouseY < 480) {
        imageOfAnimal = imgDino;
        imageOfFood = imgMeat;
        animalSize = 70;
        backgroundColor = "#496843";
        bottomAndRightEdge = 520;
    }
    //farm button
    if (mouseX > 635 && mouseX < 710 && mouseY > 505 && mouseY < 555) {
        imageOfAnimal = imgPig;
        imageOfFood = imgCorn;
        animalSize = 80;
        backgroundColor = "#BB9646";
        bottomAndRightEdge = 510;
    }
    //changing image
    for (let i = 0; i < foodArray.length; i++) {
        foodArray[i].changeImage(imageOfFood);
    }
}

function timeLimit() {
    alert("Out of time! Your score is: " + score);
    score = 0;
    go = false;
}

function displayGo() {
    if (go == true) {
        fill("red");
        rect(645, 60, 60, 30);
        textSize(30);
        fill("white");
        text("Go!", 675, 75);
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
    if (level == 1) {
        numOfFood = 8;
        numOfObstacles = 1;
        timeValue = 15000;
    }
    if (level == 2) {
        numOfFood = 6;
        numOfObstacles = 3;
        timeValue = 13000;
    }
    if (level == 3) {
        numOfFood = 4;
        numOfObstacles = 5;
        timeValue = 11000;
    }
    if (level == 4) {
        numOfFood = 2;
        numOfObstacles = 7;
        timeValue = 9000;
    }
    if (level == 5) {
        numOfFood = 1;
        numOfObstacles = 35;
        timeValue = 5000;
    }
}

//object cant go beyond borders
function checkEdges() {
    if (locationX >= bottomAndRightEdge) {
        locationX = bottomAndRightEdge;
    }
    if (locationX <= 0) {
        locationX = 0;
    }
    if (locationY >= bottomAndRightEdge) {
        locationY = bottomAndRightEdge;
    }
    if (locationY < 0) {
        locationY = 0;
    }
}

//borders to the maze
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
