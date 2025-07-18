import { Block } from "./block.js";
import { Blocks, Pellets, tileMap } from "./pac-man.js"
import { Pellet } from "./pellet.js";

export const blockRow = 21;
export const blockColumn = 19;


export class PacMap extends Block {

    constructor(position) {
        super(position);
        this.createBlocks();
        this.createPellets();
    }

    createBlocks() {
        // Creates map boundries in the form of 'Blocks' by finding corresponding 'X' position representing map Block.
        // Fn then pushes the found Block to an array of map blocks (Blocks); 

        for (let i = 0; i < blockRow; i++) {
            for (let j = 0; j < blockColumn; j++) {
                if (tileMap[i][j] === 'X') {
                    Blocks.push(new Block({
                        x: j,
                        y: i
                    }));
                }
            }
        }
    }

    createPellets() {
        // Creates pellets of class 'Pellet' for every ' ' found in the tileMap 2D array and stores it in Pellets array

        for (let i = 0; i < blockRow; i++) {
            for (let j = 0; j < blockColumn; j++) {
                if (tileMap[i][j] === ' ') {
                    Pellets.push(new Pellet({
                        x: j,
                        y: i
                    }));
                }
            }
        }
    }

    drawBlocks() {
        // Draws each block present in the tileMap on to the HTML canvas

        Blocks.forEach(block => {
            block.drawBlock();
        }
        );
    }

    locatePacMan(pacY, pacX) {
        // calls pixelToGird() fn and finds pac-man position
        if (tileMap[pacY][pacX] === ' ') {
            tileMap[pacY][pacX] = 'P';
        }

    }

};