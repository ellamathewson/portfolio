// Turtle class for p5.js in ES6 -- Nancy Doubleday 2017

/*-----Turtle commands:----------
new Turtle(x, y)    make a turtle at x, y, facing right, pen down
forward(p)          move forward p pixels
back(p)             move backwards p pixels
moveTo(x, y)        move to position(x, y)
left(deg)           turn left d degrees
right(deg)          turn right d degrees
penUp()             pen up (won't draw)
penDown()           pen down (will draw)
setPenColor(color)  set pen (stroke of turtle) to a color 
setWeight(w)        set line width to w
setAngle(deg)       turn to this absolute direction in degrees
addPoint(x, y)      for filled shapes, collect points
endTurtleShape(closed, a, b, c, d ) call to complete shape when all points are collected         parameters: true or false for closed, 
        additional parameters for color: use 1-4 values (see Turtle Reference)

------- Turtle Variables ------------
x       x position of drawing point
y       y position of drawing point
angle   in degrees, clockwise
isDown  boolean - is the pen down?
color   current color of the drawing pen (valid p5.js color)
weight  thickness in pixels 
------------------------------------*/

class Turtle {
    constructor(theX, theY) {
        /*----------------------------------
        *** TURTLE VARIABLES ***
        -----------------------------------*/
        this.x = theX;
        this.y = theY
        this.angle = 0.0;
        this.isDown = true;
        this.color = 0;
        this.weight = 1;

        // for fills
        this.vertices = [];
    }

    /*----------------------------------
    *** TURTLE FUNCTIONS ***
    -----------------------------------*/
    // --- basic movement commands ---

    // move in the direction the turtle is facing
    forward(p) {
        let rad = radians(this.angle),
            newX = this.x + cos(rad) * p,
            newY = this.y + sin(rad) * p;
        this.moveTo(newX, newY);
    }

    // move away from directio turtle is facing
    back(p) {
        this.forward(-p);
    }

    // move to an absolute position
    //if the pen is down, it will draw!
    moveTo(x, y) {
        if (this.isDown) {
            stroke(this.color);
            strokeWeight(this.weight);
            line(this.x, this.y, x, y);
        }
        this.x = x;
        this.y = y;

    }

    //turn left by deg degrees
    left(deg) {
        this.angle -= deg;
    }

    //turn right by deg degrees 
    right(deg) {
        this.angle += deg;
    }

    setAngle(deg) {
        this.angle = deg;
    }

    //make the pen draw
    penDown() {
        this.isDown = true;
    }

    // the pen will not draw when it moves
    penUp() {
        this.isDown = false;
    }

    //set the color. may have up to 4 args
    setPenColor(args) {
        switch (arguments.length) {
            case 1:
                this.color = arguments[0];
                break;
            case 2:
                this.color = color(arguments[0], arguments[1]);
                break;
            case 3:
                this.color = color(arguments[0], arguments[1], arguments[2]);
                break;
            case 4:
                this.color = color(arguments[0], arguments[1], arguments[2], arguments[3]);
                break;
        }

    }

    //set the line thickness
    setWeight(w) {
        this.weight = w;
    }

    // collect vertices for a filled shape
    addPoint(a, b) {
        this.vertices.push([a, b]);
    }

    // draws filled shape 
    endTurtleShape(closed, ...args) {
        let col = color(0)
        switch (args.length) {

            case 1:
                col = color(args[0])
                break
            case 2:
                col = color(args[0], args[1])
                break
            case 3:
                col = color(args[0], args[1], args[2])
                break
            case 4:
                col = color(args[0], args[1], args[2], args[3])
                break
            default:
                alert("Incorrect arguments for endTurtleShape")
                break
        }

        fill(col)
        beginShape()
        for (let i = 0; i < this.vertices.length; i++) {
            vertex(this.vertices[i][0], this.vertices[i][1]);
        }
        if (closed == true) endShape(CLOSE);
        else endShape();
        this.vertices = [];
    }

}
