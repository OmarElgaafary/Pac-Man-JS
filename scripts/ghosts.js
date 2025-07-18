import { ctx, tileMap } from "./pac-man.js";
import { blockColumn, blockRow } from "./pac-map.js";
import { Player } from "./player.js";

export const redAvailablePositions = new Set();
export const orangeAvailablePositions = new Set();
export const pinkAvailablePositions = new Set();

export class Ghost extends Player {
    redGhostImg = document.getElementById('red-ghost');
    pinkGhostImg = document.getElementById('pink-ghost');
    orangeGhostImg = document.getElementById('orange-ghost');




    constructor(position, ghostChar, ghostAvailablePositions) {
        super(position);
        this.findGhost(ghostChar);
        this.drawGhost();
        this.checkGhostPositions(ghostAvailablePositions);
        console.log(ghostChar, ghostAvailablePositions);
    }

    findGhost(ghostChar) {

        for (let i = 0; i < blockRow; i++) {
            for (let j = 0; j < blockColumn; j++) {
                if (tileMap[i][j] === ghostChar) {
                    this.position.x = j * this.width;
                    this.position.y = i * this.height;
                    console.log(this.position);
                }
            }
        }

    }

    drawGhost() {
        for (let i = 0; i < blockRow; i++) {
            for (let j = 0; j < blockColumn; j++) {
                if (tileMap[i][j] === 'r') {
                    ctx.drawImage(this.redGhostImg, j * this.width, i * this.height);
                }
                else if (tileMap[i][j] === 'o') {
                    ctx.drawImage(this.orangeGhostImg, j * this.width, i * this.height);
                }
                else if (tileMap[i][j] === 'p') {
                    ctx.drawImage(this.pinkGhostImg, j * this.width, i * this.height);
                }

            }
        }
    }

    checkGhostPositions(ghostAvailablePositions) {
        if (this.checkRightPosition(this.position.x, this.position.y) && !ghostAvailablePositions.has('ArrowRight'))
            ghostAvailablePositions.add('ArrowRight');
        else if (!this.checkRightPosition(this.position.x, this.position.y) && ghostAvailablePositions.has('ArrowRight'))
            ghostAvailablePositions.delete('ArrowRight')

        if (this.checkLeftPosition(this.position.x, this.position.y) && !ghostAvailablePositions.has('ArrowLeft'))
            ghostAvailablePositions.add('ArrowLeft');
        else if (!this.checkLeftPosition(this.position.x, this.position.y) && ghostAvailablePositions.has('ArrowLeft'))
            ghostAvailablePositions.delete('ArrowLeft')

        if (this.checkUpPosition(this.position.x, this.position.y) && !ghostAvailablePositions.has('ArrowUp'))
            ghostAvailablePositions.add('ArrowUp');
        else if (!this.checkUpPosition(this.position.x, this.position.y) && ghostAvailablePositions.has('ArrowUp'))
            ghostAvailablePositions.delete('ArrowUp')

        if (this.checkDownPosition(this.position.x, this.position.y) && !ghostAvailablePositions.has('ArrowDown'))
            ghostAvailablePositions.add('ArrowDown');
        else if (!this.checkDownPosition(this.position.x, this.position.y) && ghostAvailablePositions.has('ArrowDown'))
            ghostAvailablePositions.delete('ArrowDown')
    }

};