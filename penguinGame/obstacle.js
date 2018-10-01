"use strict"

class Obstacle {
    constructor(x, y, imgWidth, imgHeight, img) {
        this.x = x;
        this.y = y;
        this.image = img;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
    }

    display() {
        image(this.image, this.x, this.y, this.imgWidth, this.imgHeight);
    }

    changeImage(img) {
        this.image = img;
    }

    collide(x, y, imgWidth) {
        if (this.x + this.imgWidth / 2.5 > x - imgWidth / 2.5 &&
            this.x - this.imgWidth / 2.5 < x + imgWidth / 2.5 &&
            this.y + this.imgHeight / 2.5 > y - imgWidth / 2.5 &&
            this.y - this.imgHeight / 2.5 < y + imgWidth / 2.5) {
            return true;
        } else {
            return false;
        }
    }

    relocate(locationX, locationY, animalSize) {
        if (this.collide(locationX, locationY, animalSize) == true) {
            this.x = random(10, 550);
            this.y = random(10, 550);
        }
    }
}
