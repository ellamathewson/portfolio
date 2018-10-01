/*  Ella Mathewson 
    IGME 110
    Final Project */

"use strict"

//tile vars
let tiles = [];
let images = [];
let tileSize = 80;
let rows = 8;
let cols = 8;

//cow vars
let cow;
let cowImg;

//animation vars
var anim;
var nFrms = 18;
var animationRate = 1;

//location of cow
var locR;
var locC;

//temporary: vars for tree tiles
var levels = 100;
var bearLevel = 100;

//var for button
var changeCourse;

//heart icon
var heart;
var heart2;
var heartNum;

function preload() {
    //loading the images
    //images.push(loadImage("../images/blank.png"));
    images.push(loadImage("images/grass.jpg"));
    //source: https://commons.wikimedia.org/wiki/File:Grass_in_Pantoja_Park.jpg
    images.push(loadImage("images/trail.jpg"));
    //source: https://www.flickr.com/photos/pixellou/4118322275
    images.push(loadImage("images/poop.png"));
    //source: https://pixabay.com/en/turd-shit-pile-crap-icons-dirt-146305/
    images.push(loadImage("images/tree2.png"));
    //source: https://pixabay.com/en/tree-green-summer-isolated-1147570/
    images.push(loadImage("images/bear2.png"));
    //source: https://pixabay.com/en/wild-brown-bear-nature-animal-1280149/
    heart = loadImage("images/heart.png");
    //source: https://pixabay.com/en/pixel-heart-heart-pixel-symbol-red-2779422/
    heart2 = loadImage("images/heart2.png");
    //source: made in adobe illustrator by me

    //loading animation
    anim = new Array(nFrms);

    for (var i = 0; i < nFrms; i++) {
        anim[i] = loadImage("cowImages/cow" + i + ".png");
        //sources: http://bestanimations.com/Animals/Mammals/Bulls&Cows/cute-cartoon-cow-animation-3.gif
        //http://moziru.com/images/cow-clipart-animated-gif-12.gif
        //http://www.johngehron.com/blog/wp-content/uploads/2012/02/cow-chew.gif
    }
}

function setup() {
    createCanvas(cols * tileSize + 200, rows * tileSize);
    background("#afdef0");
    frameRate(10);
    //creating tiles
    for (let r = 0; r < rows; r++) {
        let tempArray = [];
        for (let c = 0; c < cols; c++) {
            tempArray.push(new Tile(c * tileSize, r * tileSize, tileSize, r, c, "#046", images));
        }
        tiles.push(tempArray);
    }

    //initialize vars
    locR = 1;
    locC = 3;
    heartNum = 3;

    //making the button
    textSize(25);
    changeCourse = new Button(cols * tileSize + 25, 40, 150, 80, "green", "black", "purple", "white", "Change Course");

    //making the cow
    cow = new Cow(tileSize, locR, locC, nFrms, anim);
}

function draw() {
    background("#a2e7b1");

    showHearts();

    startingTile();

    textSize(20);
    fill("black");
    text("Carl the cow", cols * tileSize + 95, 150);
    text("needs your help!", cols * tileSize + 95, 175);
    text("Eat the grass,", cols * tileSize + 95, 200);
    text("avoid bears,", cols * tileSize + 95, 225);
    text("and fertilize!", cols * tileSize + 95, 250);

    if (frameCount % animationRate == 0) {
        cow.transition();
        cow.update();
    }
    changeCourse.drawButton(mouseX, mouseY);
}

//function mousePressed() {
//    //changing tiles when clicked
//    for (let r = 0; r < rows; r++) {
//        for (let c = 0; c < cols; c++) {
//            if (tiles[r][c].checkWithin(mouseX, mouseY)) {
//                tiles[r][c].nextImage();
//                tiles[r][c].showNum();
//            }
//        }
//    }
//}

function mouseClicked() {
    if (changeCourse.checkOver(mouseX, mouseY) == true) {
        console.log("change");
        levels -= 20;
        if (levels == 0) {
            levels = 100;
        }
        tiles = [];
        for (let r = 0; r < rows; r++) {
            let tempArray = [];
            for (let c = 0; c < cols; c++) {
                tempArray.push(new Tile(c * tileSize, r * tileSize, tileSize, r, c, "#046", images));
            }
            tiles.push(tempArray);
        }
    }
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        if (tiles[locR][locC + 1].imgNum == 3) {
            locC = locC;
        } else if (tiles[locR][locC + 1].imgNum == 4) {
            locC += 2;
            cow.moveRight();
            cow.moveRight();
            heartNum--;
        } else {
            cow.moveRight();
            locC += 1;
            tiles[locR][locC].nextImage();

        }
    }
    if (keyCode === LEFT_ARROW) {
        if (tiles[locR][locC - 1].imgNum == 3) {
            locC = locC;
        } else if (tiles[locR][locC - 1].imgNum == 4) {
            locC -= 2;
            cow.moveLeft();
            cow.moveLeft();
            heartNum--;
        } else {
            cow.moveLeft();
            locC -= 1;
            tiles[locR][locC].nextImage();

        }
    }
    if (keyCode === UP_ARROW) {
        if (tiles[locR - 1][locC].imgNum == 3) {
            locR = locR;
        } else if (tiles[locR - 1][locC].imgNum == 4) {
            locR -= 2;
            cow.moveUp();
            cow.moveUp();
            heartNum--;
        } else {
            cow.moveUp();
            locR -= 1;
            tiles[locR][locC].nextImage();

        }
    }
    if (keyCode === DOWN_ARROW) {
        if (tiles[locR + 1][locC].imgNum == 3) {
            locR = locR;
        } else if (tiles[locR + 1][locC].imgNum == 4) {
            locR += 2;
            cow.moveDown();
            cow.moveDown();
            heartNum--;
        } else {
            cow.moveDown();
            locR += 1;
            tiles[locR][locC].nextImage();
        }
    }
    //tiles[locR][locC].showNum();
}

function startingTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            tiles[r][c].update();
            if (r == 1 && c == 3) {
                tiles[r][c].randomizeTile(1);
            }
        }
    }
}

function showHearts() {
    if (heartNum == 3) {
        image(heart, cols * tileSize + 20, 300, 50, 50);
        image(heart, cols * tileSize + 75, 300, 50, 50);
        image(heart, cols * tileSize + 130, 300, 50, 50);
    } 
    if (heartNum == 2) {
        image(heart, cols * tileSize + 20, 300, 50, 50);
        image(heart, cols * tileSize + 75, 300, 50, 50);
        image(heart2, cols * tileSize + 130, 300, 50, 50);

    } 
    if (heartNum == 1) {
        image(heart, cols * tileSize + 20, 300, 50, 50);
        image(heart2, cols * tileSize + 75, 300, 50, 50);
        image(heart2, cols * tileSize + 130, 300, 50, 50);
    }
    if (heartNum == 0) {
        alert("You were eaten by a bear. Try again!");
        heartNum = 3;
    }
}
//function bearTile() {
//    for (let r = 0; r < rows; r++) {
//        for (let c = 0; c < cols; c++) {
//            tiles[r][c].update();
//            if (r == 4 && c == 4) {
//                tiles[r][c].bearAttackTile(4);
//            }
//        }
//    }
//}
