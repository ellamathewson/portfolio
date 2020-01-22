/* Class for the flashlight that follows the cursor */

"use strict"

class circleObj {

    constructor(dia) {
        this.dia = dia; //diameter
        this.color = 255 //white
        this.x; //location variables
        this.y;
    }

    //displaying the flashlight
    disp(x, y) {
        this.x = x;
        this.y = y;
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.dia, this.dia);
    }
    
    //Used for levels 11-15 in order to click to make the flashlight and the collision work
    clickDisplay(x, y) {
        this.x = x;
        this.y = y;
        stroke(this.color);
        strokeWeight(2);
        if (mouseIsPressed) {
            fill(this.color);
        }
        else {
            fill(0, 0);
        }
        ellipse(this.x, this.y, this.dia, this.dia);
    }
    
    reverseDisplay(x, y) {
        this.x = y;
        this.y = x;
        stroke(this.color);
        strokeWeight(2);
        fill(this.color);
        ellipse(this.x, this.y, this.dia, this.dia);
    }
}
