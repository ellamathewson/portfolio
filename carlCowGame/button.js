/* Button class */

"use strict"

class Button {
    constructor(x, y, widthButton, heightButton, normalColor, hoverColor, clickColor, fontColor, label) {
        this.x = x;
        this.y = y;
        this.widthButton = widthButton;
        this.heightButton = heightButton;
        this.normalColor = normalColor;
        this.hoverColor = hoverColor;
        this.clickColor = clickColor;
        this.fontColor = fontColor;
        this.label = label;
    }

    //checking over for mouse
    checkOver(x, y) {
        if (x > this.x && x < this.x + this.widthButton && y > this.y && y < this.y + this.heightButton) {
            return true;
            this.colr1 = this.colr3;
        } else {
            return false;
        }
    }

    //what happens if clicked
    checkIfClicked(x, y) {
        if (x > this.x && x < this.x + this.widthButton && y > this.y && y < this.y + this.heightButton) {
            return true;
            this.colr1 = this.colr3;
        } else {
            return false;
        }
    }

    //displaying the button
    drawButton(mouseX, mouseY) {
        if (this.checkOver(mouseX, mouseY) == true) {
            fill(this.normalColor);
            rect(this.x, this.y, this.widthButton, this.heightButton);
            fill(this.fontColor);
            textSize(15);
            textStyle(BOLD);
            textAlign(CENTER, CENTER);
            text(this.label, this.x + this.widthButton / 2, this.y + this.heightButton / 2);
        } else {
            fill(this.hoverColor);
            rect(this.x, this.y, this.widthButton, this.heightButton);
            fill(this.fontColor);
            textSize(15);
            textStyle(BOLD);
            textAlign(CENTER, CENTER);
            text(this.label, this.x + this.widthButton / 2, this.y + this.heightButton / 2);
        }

    }
}
