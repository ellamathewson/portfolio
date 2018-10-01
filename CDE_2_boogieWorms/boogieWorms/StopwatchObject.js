/* Stopwatch class; used for timing the level and calculating the score */

"use strict"

class Stopwatch {

    constructor() {
        this.StartMilliseconds = 0;
        this.ElapsedMilliseconds = 0;
    }

    start() {
        this.StartMilliseconds = new Date();
    }
    
    stop() {
        return this.ElapsedMilliseconds = (new Date() - this.StartMilliseconds) / 1000;
    }
}
