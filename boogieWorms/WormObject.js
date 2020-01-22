/* Class for the worms */

"use strict"

class WormObject {

    constructor(maxDev) {
        colorMode(HSB);

        //starting location
        this.xLoc = windowWidth / 2;
        this.yLoc = windowHeight / 2;
//        this.xLoc = random(windowWidth / 6, (5 * windowWidth) / 6);
//        this.yLoc = random(windowHeight / 6, (5 * windowHeight) / 6);

        //color of worm
        this.hueVal = random(360);
        this.maxDev = maxDev;

        //new locations
        this.newX = this.newX
        this.newY = this.newY

        //this.hit
    }

    display() {
        //location of next line
        this.newX = this.xLoc + random(-this.maxDev, this.maxDev);
        this.newY = this.yLoc + random(-this.maxDev, this.maxDev);

        this.keepOnCanvas();

        stroke(this.hueVal, 100, 100);
        strokeWeight(10);

        //draws the line
        line(this.xLoc, this.yLoc, this.newX, this.newY);

        //reseting the location to move it
        this.xLoc = this.newX;
        this.yLoc = this.newY;

        //changing the hue value as it changes for the disco effect
        this.hueVal = (this.hueVal + 5) % 360;
    }

    collide(wArray, i, lightDia, x, y) {
        //collision
        this.hit = collideLineCircle(this.xLoc, this.yLoc, this.newX, this.newY, x, y, lightDia);

        //what happens when collision occurs
        if (this.hit) {

            //takes away the worm that was hit
            wArray.splice(i, 1);

            //for debugging purposes
            //console.log(wArray);
        }
    }

    reset(wArray) {
        wArray = [];
    }

    keepOnCanvas() {
        //keeps it on the page
        if (this.newY > windowHeight) {
            this.newY = windowHeight;
        }
        if (this.newX > windowWidth) {
            this.newX = windowWidth;
        }
        if (this.newX < 0) {
            this.newX = 0;
        }
        if (this.newY < 0) {
            this.newY = 0;
        }
    }
}
