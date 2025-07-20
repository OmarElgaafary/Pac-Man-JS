import { ctx, tileMap } from "./pac-man.js";
import { blockColumn, blockRow } from "./pac-map.js";
import { Player } from "./player.js";

export class Ghost extends Player {
    redGhostImg = document.getElementById('red-ghost');
    pinkGhostImg = document.getElementById('pink-ghost');
    orangeGhostImg = document.getElementById('orange-ghost');

    ghostChar;
    currentDirection = 'ArrowLeft';

    availableDirections = [];
    oppositeDirection = null;

    constructor(position, ghostChar) {
        super(position);
        this.findGhost(ghostChar);
        this.updateAvailableDirections();
        this.ghostChar = ghostChar;
    }

    findGhost(ghostChar) {
        for (let i = 0; i < blockRow; i++) {
            for (let j = 0; j < blockColumn; j++) {
                if (tileMap[i][j] === ghostChar) {
                    this.position.x = j * this.width;
                    this.position.y = i * this.height;
                    console.log(this.position);
                    return;
                }
            }
        }
    }

    drawGhost() {

        ctx.drawImage(this.ghostImage(), this.position.x, this.position.y);
    }
    /*
                        blockChar === '-' ||
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
                        blockChar === ')'
    */

    blockClear(posY, posX) {
        if (tileMap[posY][posX] !== '-'
            && tileMap[posY][posX] !== '|'
            && tileMap[posY][posX] !== '['
            && tileMap[posY][posX] !== ']'
            && tileMap[posY][posX] !== 'T'
            && tileMap[posY][posX] !== '_'
            && tileMap[posY][posX] !== '<'
            && tileMap[posY][posX] !== '>'
            && tileMap[posY][posX] !== '{'
            && tileMap[posY][posX] !== '}'
            && tileMap[posY][posX] !== '~'
            && tileMap[posY][posX] !== '^'
            && tileMap[posY][posX] !== '('
            && tileMap[posY][posX] !== ')'
            && tileMap[posY][posX] !== 'f')
            return true
        else
            return false;

    }

    updateAvailableDirections() {
        this.availableDirections = [];

        const currentGridX = Math.round(this.position.x / this.width);
        const currentGridY = Math.round(this.position.y / this.height);


        if (currentGridX + 1 < blockColumn && this.blockClear(currentGridY, currentGridX + 1)) {
            this.availableDirections.push('ArrowRight');
        }
        if (currentGridX - 1 >= 0 && this.blockClear(currentGridY, currentGridX - 1)
        ) {
            this.availableDirections.push('ArrowLeft');
        }
        if (currentGridY - 1 >= 0 && this.blockClear(currentGridY - 1, currentGridX)) {
            this.availableDirections.push('ArrowUp');
        }
        if (currentGridY + 1 < blockRow && this.blockClear(currentGridY + 1, currentGridX)) {
            this.availableDirections.push('ArrowDown');
        }
    }

    ghostImage() {
        switch (this.ghostChar) {
            case 'r':
                return this.redGhostImg;
            case 'o':
                return this.orangeGhostImg;
            case 'p':
                return this.pinkGhostImg;
            default:
                return this.redGhostImg;
        }
    }

    getOppositeDirection(direction) {
        switch (direction) {
            case 'ArrowUp': return 'ArrowDown';
            case 'ArrowDown': return 'ArrowUp';
            case 'ArrowLeft': return 'ArrowRight';
            case 'ArrowRight': return 'ArrowLeft';
            default: return null;
        }
    }

    trackGhost() {

        let ghostY = Math.floor(this.position.y / 32);
        let ghostX = Math.floor(this.position.x / 32);

        for (let i = 0; i < blockRow; i++) {
            for (let j = 0; j < blockColumn; j++) {
                if (tileMap[i][j] === `${this.ghostChar}`)
                    tileMap[i][j] = ' ';
                tileMap[ghostY][ghostX] = `${this.ghostChar}`;
            }
        }
    }

    getGhostPosition() {
        return this.position;
    }

    ghostMovement() {
        const speed = 2;

        if (this.position.x % this.width === 0 && this.position.y % this.height === 0) {
            this.updateAvailableDirections();

            let possibleDirections = this.availableDirections.filter(
                dir => dir !== this.oppositeDirection
            );

            if (possibleDirections.length === 0 && this.availableDirections.includes(this.oppositeDirection)) {
                possibleDirections = this.oppositeDirection;
            } else if (possibleDirections.length === 0) {
                return;
            }


            const randIndex = Math.floor(Math.random() * possibleDirections.length);
            const randDirection = possibleDirections[randIndex];

            this.currentDirection = randDirection;
            this.oppositeDirection = this.getOppositeDirection(this.currentDirection);
        }

        if (this.currentDirection === 'ArrowLeft') {
            this.position.x -= speed;
            this.position.y = Math.round(this.position.y / this.height) * this.height; // Align Y
        } else if (this.currentDirection === 'ArrowRight') {
            this.position.x += speed;
            this.position.y = Math.round(this.position.y / this.height) * this.height; // Align Y
        } else if (this.currentDirection === 'ArrowUp') {
            this.position.y -= speed;
            this.position.x = Math.round(this.position.x / this.width) * this.width; // Align X
        } else if (this.currentDirection === 'ArrowDown') {
            this.position.y += speed;
            this.position.x = Math.round(this.position.x / this.width) * this.width; // Align X
        }

        ctx.drawImage(this.ghostImage(), this.position.x, this.position.y);
    }
}