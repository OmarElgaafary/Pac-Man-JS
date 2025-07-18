import { tileMap } from "./pac-man.js";

export class Player {
    width = 32;
    height = 32;


    checkRightPosition(posX, posY) {
        let nextX = Math.floor(posX / 32) + 1;
        let nextY = Math.floor(posY / 32);


        if (tileMap[nextY][nextX] === ' ' || tileMap[nextY][nextX] === 'P') {
            this.eatPellet(nextY, nextX);
            return true;
        }
        else
            return false;
    }

    checkLeftPosition(posX, posY) {
        let nextX = Math.floor((posX + this.width - 1) / 32) - 1;
        let nextY = Math.floor(posY / 32);

        // addition logic for starting x value

        if ((nextX * 32 + this.width !== posX)) {
            this.eatPellet(nextY, nextX);
            return true;
        }
        else if (tileMap[nextY][nextX] === ' ' || tileMap[nextY][nextX] === 'P') {
            this.eatPellet(nextY, nextX);
            return true;

        }
        else
            return false;
    }

    checkUpPosition(posX, posY) {
        let nextX = Math.floor((posX / 32));
        let nextY = Math.floor((posY / 32)) - 1;

        // addition logic for starting y value

        if ((nextY * 32 + this.height) !== posY) {
            this.eatPellet(nextY, nextX);
            return true;
        }
        else if (tileMap[nextY][nextX] === ' ' || tileMap[nextY][nextX] === 'P') {
            this.eatPellet(nextY, nextX);
            return true;
        }
        else
            return false;
    }

    checkDownPosition(posX, posY) {
        let nextX = Math.floor(posX / 32);
        let nextY = Math.floor(posY / 32) + 1;


        if (tileMap[nextY][nextX] === ' ' || tileMap[nextY][nextX] === 'P') {
            this.eatPellet(nextY, nextX);
            return true;

        }
        else
            return false;
    }
};