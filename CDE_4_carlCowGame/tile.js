/* Tile class */

"use strict"

class Tile {
    constructor(x, y, size, c, r, bgCol, imList) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.bgCol = bgCol;
        this.imageList = imList;

        //for randomizing the tree and bear tiles
        this.num = Math.floor(random(levels));
        if (this.num < 9) {
            this.imgNum = 3;
        } 
        else if (this.num < 12) {
            this.imgNum = 4;
            //console.log(" bitch");
        } else
            
        this.imgNum = 0;
        this.indexC = c;
        this.indexR = r;
    }

    update() {
        fill(this.bgCol);
        noStroke();
        rect(this.x, this.y, this.size, this.size);
        image(this.imageList[this.imgNum], this.x, this.y, this.size, this.size);
    }

    //sprite interacting with tiles
    nextImage() {
        this.imgNum++;
        if (this.imgNum == 3) {
            this.imgNum = 0;
        }
    }

    showNum() {
        console.log(this.indexR, this.indexC);
    }

    randomizeTile(num) {
        image(this.imageList[num], this.x, this.y, this.size, this.size);
    }

    checkWithin(x, y) {
        if (x > this.x &&
            x < this.x + this.size &&
            y > this.y &&
            y < this.y + this.size) {
            return true;
        } else {
            return false;
        }
    }
}
