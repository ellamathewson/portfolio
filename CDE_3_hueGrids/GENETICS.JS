"use strict"
/**
 * Project3-5 Hue Grid with Breeding Generation
 * 
 * Class for the genetic operators that will act on chromosomes, specifically mutate
 * and crossover. Mutate takes one bit in the chromosome and flips it. Crossover 
 * takes a random bit location and combines the bits from two parents. Select takes two
 * random grids and compares their fitness value. The highest value grid gets returned. Breed1
 * takes two parents, crosses them over, and mutates the child. Elite searches through the 
 * grids to find the one with the highest fitness value.
 *
 * Ella Mathewson
 */
class Genetics {
    constructor(chromLength, populationSize) {
        this.chromLength = chromLength; //length of chromosome
        this.bitNum = 2 ** chromLength; //sets it to the power of 2 to get the num of bits
        this.populationSize = populationSize; //number of grids (9)
        this.chromArray = []; //array for the hueGrids
        this.fitnessArray = []; //arary for values of fitness
    }

    randomChrom() {
        //Randomizes the mutation bit
        return Math.floor(random(this.bitNum));
    }

    mutation(chrom) {
        //Randomizes the loaction of the mutation
        let bitLoc = Math.floor(random(0, this.chromLength));

        //shifts the bits to the left
        let mask = 1 << bitLoc;

        //return the mutated chrom
        return chrom ^ mask;
    }

    crossOver(parent1, parent2) {
        //randomizes the bit location
        let bitLoc = Math.floor(random(0, this.chromLength - 1));

        //mask for parent 1
        let p1Mask = ((bitLoc + 1) ** 2) - 1;

        //combining the mask from parent 1 and parent 1
        let p1Bits = p1Mask & parent1;

        //shifting the bits of parent 2 right and then left
        let p2Bits = (parent2 >>> bitLoc) << bitLoc;

        //Combining parent 1 and parent 2 with an exclusive or 
        return parent1 | parent2;
    }

    insertNew(chrom, fitness, index) {
        //inserts chromosome and fitness at specific index
        this.chromArray[index] = chrom;
        this.fitnessArray[index] = fitness;
    }

    bumpFitness(index, amount) {
        //increases the fitness value
        this.fitnessArray[index] += amount;
        console.log(index, this.fitnessArray[index]);
    }

    selectFit() {
        //randomly picked two grids to compare
        let randomGrid = Math.floor(random(0, this.populationSize));
        let randomGrid2 = Math.floor(random(0, this.populationSize));

        //prints what the two grids are and what their fitness value is
        console.log("Select: " + randomGrid, this.fitnessArray[randomGrid], randomGrid2, this.fitnessArray[randomGrid2]);

        //compares the fitness values of the two grids
        if (this.fitnessArray[randomGrid] > this.fitnessArray[randomGrid2]) {
            return this.chromArray[randomGrid];
        } else {
            return this.chromArray[randomGrid2];
        }
    }

    breed1() {
        //Selects two parents
        let oneParent = this.selectFit();
        let twoParent = this.selectFit();

        //Crosses them over
        let child = this.crossOver(oneParent, twoParent);

        //Randomly mutates the child
        let result = this.mutation(child);

        console.log("result: " + (result));

        //returns the child hue grid
        return result;
    }

    elite() {
        //local varaible that starts at first hue grid
        let best = 0;

        //goes through the fitness array and looks for the highest value, returns the index of the fitnessArray so we know which grid has the highest value
        for (let i = 1; i < this.populationSize; i++) {
            if (this.fitnessArray[best] < this.fitnessArray[i]) {
                best = i;
            }
        }

        console.log(best + " = grid with highest value");

        //returns the location of the grid with the highest fitness value
        return this.chromArray[best];
    }
}
