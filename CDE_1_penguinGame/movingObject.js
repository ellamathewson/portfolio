"use strict"

class movingObject {
    constructor(x, y, objSize, img) {
        this.x = x;
        this.y = y;
        this.objSize = objSize;
        this.deltaSpeed = 3;
        this.image = img;
    }

    display(img) {
        image(this.image, this.x, this.y, this.objSize, this.objSize);
    }

    moveUp() {
        this.y -= this.deltaSpeed;
    }

    moveDown() {
        this.y += this.deltaSpeed;
    }

    moveLeft() {
        this.x -= this.deltaSpeed;
    }

    moveRight() {
        this.x += this.deltaSpeed;
    }
}
