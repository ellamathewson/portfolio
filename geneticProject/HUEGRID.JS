"use strict"
/**
 * Project3-5 Hue Grid with Breeding Generation
 * 
 * Class for the HueGrid so multiple can display on one canvas. Must pass in the
 * chromosome to create randomization, an x and y location, and width and height.
 * Used in the main function to create nine HueGrids at different locations with 
 * randomized properties like stroke on/off, stroke color, initialized function (such
 * as line, random, parabola, or sine functions), and size of the cells. Along with this,
 * it can detect if the mouse is over a grid.
 *
 * Ella Mathewson
 */
class HueGrid {
    constructor(chrom, x, y, gridWidth, gridHeight) { //Passed in a random chromosome value
        this.hueVal; //Global 2D array of hue values
        this.chrom = chrom; //sets the value we pass in equal to this.chrom
        //this.cellSize = 10; //size of the cells
        this.strokeOn = false; //changing the stroke on or off
        this.maxDev = 5; //deviation of the colors
        this.brightness = 100; //brightness of cells
        this.strokeColor = 0; //starting color of stroke (black)
        this.lineNum = 0; //Number of lines
        this.reset(chrom); //Passes the chomosome into reset method
        this.x = x; //x value of origin
        this.y = y; //y value of origin
        this.gridWidth = 300; //width of the individual grid
        this.gridHeight = 200; //height of the individual grid
    }

    reset(chrom) {
        //Chromosome vars
        this.chrom = chrom; //makes an attribute and adds 0's onto the left, isolating the gene
        this.cellSize = (this.chrom & 15) + 3; //Cell size
        this.initMeth = (this.chrom >>> 4) & 3; //Initial shape that is displayed
        this.initStroke = (this.chrom >>> 6) & 1; //Changes stroke on or off
        this.strokeColorMeth = (this.chrom >>> 7) & 3; //Changes color of stroke
        this.boundMeth = (this.chrom >>> 10) & 1; //Changes hue method

        background(100);

        //Creating the cells. Used math.floor to round the values
        let rowLeng = Math.floor(300 / this.cellSize);
        let colLeng = Math.floor(200 / this.cellSize);

        //Switch statement for the number of lines selected
        switch (this.initMeth) {
            case 0:
                this.lineNum = 0;
                break;
            case 1:
                this.lineNum = 2;
                break;
            case 2:
                this.lineNum = 4;
                break;
            case 3:
                this.lineNum = 8;
                break;
            default:
                this.lineNum = 0;
                break;
        }

        let scaleVal = (360 / (rowLeng + colLeng)) + this.lineNum; //diagonal gradient initialization; lineNum used to change the number of lines when the lines option is selected 

        this.hueVal = []; //array for cell colors

        //Nested for loops used to create a matrix in a matrix. i are the rows and j are the columns
        for (let i = 0; i < rowLeng; i++) {
            this.hueVal[i] = [];
            for (let j = 0; j < colLeng; j++) {
                //Switch statement to change the starting shape of the colors
                //All are divided by 360 in order to avoid the lag caused by the graphics card from normalizing the hue value. In dividing it by 360, we do the graphics cards work, which speeds up the program
                switch (this.initMeth) {
                    case 0:
                        this.hueVal[i][j] = ((i * j) * scaleVal % 360);
                        //Parabola shape for the colors of the cells. Multiplied by scaleVal to get more lines, as well as create a shell sort of shape when it gets high enough. 
                        break;
                    case 1:
                        this.hueVal[i][j] = ((i + j) * scaleVal % 360);
                        //Creates diagonal lines across the screen. Multipled by scaleVal to get more lines
                        break;
                    case 2:
                        this.hueVal[i][j] = random(360);
                        //Randomly assigns a hue value to the square, no shape to it
                        break;
                    case 3:
                        let y = (10 + scaleVal) * sin(i * 0.25);
                        this.hueVal[i][j] = ((i + y + j) * scaleVal % 360);
                        //Shows a sine wave on the screen. The y variable is used for the math of the sine function, then added with i and j and assigned as hue value. Also multiplied by scaleVal to get more waves.
                        break;
                    default:
                        this.hueVal[i][j] = random(360);
                        //Randomly assigns a hue value to the square as the default
                        break;
                }
            }
        }
    }

    display() {
        push();
        translate(this.x, this.y); //set the Huegrid's origin

        //Assigning the values from the slider
        this.maxDev = maxDevSlider.value();
        this.brightness = brightSlider.value();

        switch (this.initStroke) {
            case 0:
                this.strokeOn = true;
                break;
            case 1:
                this.strokeOn = false;
                break;
            default:
                this.strokeOn = false;
                break;
        }

        //Changes the stroke color
        if (this.strokeOn) {
            switch (this.strokeColorMeth) {
                case 0:
                    stroke(0, 0, 100);
                    break;
                case 1:
                    stroke(0, 0, 0);
                    break;
                case 2:
                    stroke(0, 0, 50);
                    break;
                case 3:
                    stroke(186, 68, 66);
                    break;
                default:
                    //Default is black stroke
                    stroke(0, 0, 0);
                    break;
            }
        } else {
            noStroke();
        }

        //Labels for the sliders with changing values
        maxDevLabel.html("Max Dev:  " + Math.round(maxDevSlider.value()));
        brightLabel.html("Brightness:  " + Math.round(brightSlider.value()));

        //Order in squared in terms of complexity. As cell size gets smaller, in gets larger, and order in squared grows
        for (let i = 0; i < this.hueVal.length; i++) {
            for (let j = 0; j < this.hueVal[i].length; j++) {
                //Changing the color of the cell - results ifn flashing
                this.hueVal[i][j] = this.alterHue(this.hueVal[i][j]);
                //Color of each cell
                fill(this.hueVal[i][j], this.brightness, 100);
                //Individual cells
                rect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
            }
        }
        pop();
    }

    alterHue(hue) {
        //Prevents a lot of red appearing on the screen, as any value over 360 or under 0 results in red. Wraps it around the color wheel
        switch (this.boundMeth) {
            case 0:
                let bound = random(this.maxDev);
                hue += random(-bound, bound);

                //Keeps it in the 0-360 range
                if (hue > 360) {
                    hue -= this.maxDev % 360;
                } else if (hue < 0) {
                    hue += this.maxDev % 360;
                }
                break;
            case 1:
                hue += random(-this.maxDev, this.maxDev);
                if (hue > 360)
                    hue -= 360;
                else if (hue < 0)
                    hue += 360;
                break;
            default:
                //Default is no bound
                hue += random(-this.maxDev, this.maxDev);
                if (hue > 360)
                    hue -= 360;
                else if (hue < 0)
                    hue += 360;
                break;
        }
        return hue;
    }

    mouseOver() {
        //changing the fitness value of the individual grid. If mouse is over a specific grid, it returns true or false
        if (mouseX > this.x && mouseX < this.gridWidth + this.x && mouseY > this.y && mouseY < this.gridHeight + this.y) {
            return true;
        } else {
            return false;
        }
    }
}
