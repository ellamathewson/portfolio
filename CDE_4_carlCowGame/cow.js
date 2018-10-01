/* Sprite class */

"use strict"

class Cow {
    constructor(size, r, c, n, imgs) {
        this.size = size;
        this.row = r;
        this.col = c;
        this.numFrms = n;
        this.anim = imgs;
        this.curF = 0;

        //array for animation
        this.cowMovementArray = [
            [5, 10, 1],
            [6, 11, 2],
            [7, 12, 3],
            [8, 13, 4],
            [5, 14, 1],
            [6, 15, 2],
            [7, 16, 3],
            [8, 17, 4],
            [5, 9, 1],
            [6, 10, 2],
            [7, 11, 3],
            [8, 12, 4],
            [5, 13, 1],
            [6, 14, 2],
            [7, 15, 3],
            [8, 16, 4],
            [5, 17, 1],
            [6, 9, 2],
          ];
    }

    moveRight() {
        if (this.col < cols - 1) {
            this.col += 1;
        }
    }

    moveLeft() {
        if (this.col > 0) {
            this.col -= 1;
        }
    }

    moveUp() {
        if (this.row > 0) {
            this.row -= 1;
        }
    }

    moveDown() {
        if (this.row < rows - 1) {
            this.row += 1;
        }
    }
    
    //moving the sprite
    transition() {
        var inputType;
        if (keyIsDown(RIGHT_ARROW)) {
            inputType = 2;
            console.log("RIGHT");
        } else if (keyIsDown(LEFT_ARROW)) {
            inputType = 0;
            console.log("LEFT");
        } else if (keyIsDown(UP_ARROW)) {
            inputType = 2;
        } else if (keyIsDown(DOWN_ARROW)) {
            inputType = 0;
        } else {
            inputType = 1;
        }
        this.curF = this.cowMovementArray[this.curF][inputType];
    }

    update() {
        image(this.anim[this.curF], this.col * this.size, this.row * this.size, this.size, this.size);
    }
}
