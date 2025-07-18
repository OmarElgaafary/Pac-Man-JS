import { ctx, tileMap} from "./pac-man.js";
import { blockColumn, blockRow } from "./pac-map.js";
import { Player } from "./player.js";

export class Ghost extends Player {
    redGhostImg = document.getElementById('red-ghost');
    pinkGhostImg = document.getElementById('pink-ghost');
    orangeGhostImg = document.getElementById('orange-ghost');


    constructor(position) {
        super();
        this.drawGhost();
    }

    // findGhost()
    // {
    //     for ()
    // }

    drawGhost() {
        for (let i = 0; i < blockRow; i++) {
            for (let j = 0; j < blockColumn; j++) {
                if (tileMap[i][j] === 'r') {
                    ctx.drawImage(this.redGhostImg, j * this.width, i * this.height)
                }
                else if (tileMap[i][j] === 'o') {
                    ctx.drawImage(this.orangeGhostImg, j * this.width, i * this.height)
                }
                else if (tileMap[i][j] === 'p') {
                    ctx.drawImage(this.pinkGhostImg, j * this.width, i * this.height)
                }

            }
        }
    }

    ghostAvailablePositions() {
        this.ghostCheckLeft();
        this.ghostCheckRight();
        this.ghostCheckUp();
        this.ghostCheckDown();
    }

    ghostCheckRight() {

    }
    ghostCheckRight() {

    }
    ghostCheckRight() {

    }
    ghostCheckRight() {

    }



};