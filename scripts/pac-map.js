import { Block } from "./block.js";
import { Blocks, Pellets, tileMap } from "./pac-man.js"
import { Pellet } from "./pellet.js";

export const blockRow = 21;
export const blockColumn = 19;



export class PacMap extends Block {
    fruit;

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
                const blockChar = tileMap[i][j];
                if (blockChar === '-' ||
                    blockChar === '|' ||
                    blockChar === ']' ||
                    blockChar === '[' ||
                    blockChar === 'T' ||
                    blockChar === '_' ||
                    blockChar === '<' ||
                    blockChar === '>' ||
                    blockChar === '{' ||
                    blockChar === '}' ||
                    blockChar === '~' ||
                    blockChar === '^' ||
                    blockChar === '(' ||
                    blockChar === ')') {
                    Blocks.push(new Block({
                        x: j,
                        y: i
                    }, blockChar));
                }
            }
        }
    }

    createPellets() {
        // Creates pellets of class 'Pellet' for every ' ' found in the tileMap 2D array and stores it in Pellets array

        for (let i = 0; i < blockRow; i++) {
            for (let j = 0; j < blockColumn; j++) {
                if (tileMap[i][j] === ' ' || tileMap[i][j] === 'P') {
                    Pellets.push(new Pellet({
                        x: j,
                        y: i
                    }));
                }
                else if (tileMap[i][j] === 'f') {
                    const randNum = String(Math.floor((Math.random() * 3)) + 1);
                    console.log(randNum)
                    switch (randNum) {
                        case '1':
                            this.fruit = {
                                name: 'strawberry',
                                x: j,
                                y: i,
                                status: true
                            }
                            break;
                        case '2':
                            this.fruit = {
                                name: 'cherry',
                                x: j,
                                y: i,
                                status: true
                            }
                            break;
                        case '3':
                            this.fruit = {
                                name: 'apple',
                                x: j,
                                y: i,
                                status: true
                            }
                            break;
                    }
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
