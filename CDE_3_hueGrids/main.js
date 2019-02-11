"use strict"
/**
 * Project3-5 Hue Grid with Breeding Generation
 *
 * Third version of the HueGrid family of programs that generate
 * alleged art.  A HueGrid is a 2D array (grid) of hue values that
 * display as a grid of squares that (mostly) fills the canvas.
 * 
 * The genetic operations included are the crossover button, which takes 2 random 
 * grids and crosses them over together, displaying the child in the first grid 
 * location. Mutate changes the first grid randomly. The select button takes two random grids, 
 * compares their fitness values (how much you like or dislike the grid, based upon how many 
 * times the plus or minus key are pressed), and returns the grid with the higher value. 
 *
 * Options that are manually changed are max devation (how fast the boxes flash), brightness, 
 * and reset, which resets the grid of hueGrids. 
 * 
 * In this version, the buttons Breed1 and Breed Generation are included. Breed1 selects two
 * parents, does a crossover between them to create a child grid, and then mutates the grid, 
 * returning the grid to the first position. 
 *
 * Breed Generation goes through all the grids to 
 * find the grid with the highest fitness value, and resets that one in the first position, as
 * well as breeds a new generation of grids with similar attributes to the ones with higher
 * fitness values.
 * 
 * Ella Mathewson
 */

let stBut; //used for creating the button which controls stroke

let resetBut; //used to reconfigure the canvas

let maxDevSlider; //slider variable
let maxDevLabel; //label for max deviation slider

let cellSizeSlider; //slider for changing cell size
let cellSizeLabel; //label for cell size slider

let brightSlider; //changing the brighness
let brightLabel; //label for brightness slider

let theHueGrids; //Var for array of hue grids
let numGrids; //value of the number of grids

let genObject; //object for genetics

let mutateButton; //button for mutations genetics
let crossButton; //button for crossover genetics

let selectButton; //button for select tournament

let breed1Button; //button for breed1

let breedGenButton; //button for breeding a generation

let cnv;

let posX;
let posY;

function centerCanvas() {
    posX = (windowWidth - width) / 2;
    posY = ((windowHeight - height) / 2);
    console.log(posX, posY);
    cnv.position(posX, posY);
}

function setup() {
    cnv = createCanvas(960, 720);
    cnv.position(posX, posY);
    centerCanvas();

    colorMode(HSB);
    background(100);
    noStroke();
    numGrids = 9;

    //Creating a new Genetics object for mutation
    genObject = new Genetics(10, 9);

    //Max deviation slider
    maxDevSlider = createSlider(0, 50, 5, 0);
    maxDevSlider.position(20 + posX, 40 + posY);

    //Text above the max dev slider
    maxDevLabel = createDiv("Max Dev"); //createDiv used to show text
    maxDevLabel.position(maxDevSlider.x, maxDevSlider.y - 20);

    //Slider for changing the brightness 
    brightSlider = createSlider(25, 100, 100, 0);
    brightSlider.position(160 + posX, 40 + posY);

    //Text above slider for changing brightness
    brightLabel = createDiv("Brightness");
    brightLabel.position(brightSlider.x, brightSlider.y - 20);

    //Reset button
    resetBut = createButton("Reset");
    resetBut.position(900 + posX, 40 + posY);
    resetBut.mouseClicked(reset); //when mouse is pressed, the function reset is enacted

    //Mutate button
    mutateButton = createButton("Mutate");
    mutateButton.position(815 + posX, 40 + posY);
    mutateButton.mouseClicked(mutateChrom); //when pressed, will mutate a chromosome 

    //Crossover button
    crossButton = createButton("Crossover");
    crossButton.position(700 + posX, 40 + posY);
    crossButton.mouseClicked(crossChrom); //when pressed, will crossover two parent chromosomes

    //Select button
    selectButton = createButton("Select");
    selectButton.position(600 + posX, 40 + posY);
    selectButton.mouseClicked(selectBt); //when pressed, will crossover two parent chromosomes

    //Breed1 button
    breed1Button = createButton("Breed1");
    breed1Button.position(500 + posX, 40 + posY);
    breed1Button.mouseClicked(breed);

    //Breed Generation button
    breedGenButton = createButton("Breed Generation");
    breedGenButton.position(350 + posX, 40 + posY);
    breedGenButton.mouseClicked(breedGen);

    theHueGrids = [];

    /* LOOP FOR PLACING THE GRIDS ON THE SCREEN USING A FORMULA */
    for (let i = 0; i < numGrids; i++) {
        let newChrom = genObject.randomChrom();
        theHueGrids[i] = new HueGrid(newChrom, (20 * (i % 3)) + 300 * (i % 3), Math.floor(i / 3) * 220 + 80, 300, 200);
        genObject.insertNew(newChrom, 0, i);
    }
}

function windowResized() {
    centerCanvas();
    maxDevSlider.position(20 + posX, 40 + posY);
    brightSlider.position(160 + posX, 40 + posY);
    resetBut.position(900 + posX, 40 + posY);
    mutateButton.position(815 + posX, 40 + posY);
    crossButton.position(700 + posX, 40 + posY);
    selectButton.position(600 + posX, 40 + posY);
    breed1Button.position(500 + posX, 40 + posY);
    breedGenButton.position(350 + posX, 40 + posY);

}

function draw() {
    for (let i = 0; i < numGrids; i++) {
        theHueGrids[i].display(); //Calls the display in the HueGrid class
    }
}

function reset() {
    for (let i = 0; i < numGrids; i++) {
        theHueGrids[i].reset(genObject.randomChrom()); //Pass in random chromosome
    }
}

function mutateChrom() {
    //Creates a new chrom and assigns it to genObject for the randomized mutation
    let newChrom = genObject.mutation(theHueGrids[0].chrom);

    //Resets the first hueGrid to show the mutation
    theHueGrids[0].reset(newChrom);

    console.log(hex(newChrom));
}

function crossChrom() {
    //randomizes which hue grid will be the parents
    let val = Math.floor(random(1, numGrids));
    let val2 = Math.floor(random(1, numGrids));

    //creates a new chrom and assigns it to the genObject for crossover
    let newChrom = genObject.crossOver(theHueGrids[val].chrom, theHueGrids[val2].chrom);

    //Resets the first hueGrid to show the child crossover from the two parents
    theHueGrids[0].reset(newChrom);

    console.log(hex(newChrom));
}

function keyTyped() {
    for (let i = 0; i < numGrids; i++) {
        //if plus (or equal) is pressed, fitness value is added. Both keys are here because I don't want to press shift when I'm adding the fitness value. Also useability.
        if (theHueGrids[i].mouseOver() == true && (key == '=' || key == '+')) {
            genObject.bumpFitness(i, 1);
        } else if (theHueGrids[i].mouseOver() == true && key == '-') {
            //if minus is pressed, fitness value is subtracted
            genObject.bumpFitness(i, -1);
        }
    }
}

function selectBt() {
    //whichever grid is returned is the one displayed in the first grid
    let newChrom = genObject.selectFit();

    //resets the first grid to display it
    theHueGrids[0].reset(newChrom);

    //resets the fitness array -- only can run once
    genObject.insertNew(newChrom, 0, 0);
}

function breed() {
    //whichever grid is returned is the one displayed in the first grid
    let newChrom = genObject.breed1();

    //resets the first grid to display it
    theHueGrids[0].reset(newChrom);

    //resets the fitness array -- only can run once
    genObject.insertNew(newChrom, 0, 0);
}

function breedGen() {
    //local array for next generation of chromosomes
    let nextGen = [];

    //finding the grid with the highest fitness method
    let newChrom = genObject.elite();

    //grid with the highest fitness is placed in the first position
    nextGen[0] = newChrom;

    //breeding a new chromosome and inserting it into the local array
    for (let i = 1; i < numGrids; i++) {
        nextGen[i] = genObject.breed1();
    }

    for (let i = 0; i < numGrids; i++) {
        //resets the fitness array -- only can run once
        genObject.insertNew(nextGen[i], 0, i);

        //resets the first grid to display it
        theHueGrids[i].reset(nextGen[i]);
    }
}
