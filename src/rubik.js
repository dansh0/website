import { Cube } from "./cube.js"

class Rubik {
    
    constructor(size) {
        this.cubes = [];
        this.rows = [];
        this.columns = [];
        this.layers = [];
        this.size = size; // # of layers, usually 3
        this.colors = [
            'green',
            'blue',
            'orange',
            'red',
            'white',
            'yellow'
            ] // in order of x-, x+, y-, y+, z-, z+
        this.init()
    }

    init() {
        // grid positions
        let xPos = [...Array(3).keys()];
        let yPos = [...Array(3).keys()];
        let zPos = [...Array(3).keys()];

        xPos.forEach(i => {
            yPos.forEach(j => {
                zPos.forEach(k => {
                    let cube = new Cube(i, j, k, this.size, this.colors)

    }