import { tileMap } from "./pac-man.js";

export class Player {
    position = {};
    width = 32;
    height = 32;

    constructor(position) {
        // Constructor initalizes block coordinates

        this.position =
        {
            x: position.x,
            y: position.y
        };
    }


    checkRightPosition(posX, posY) {
        let nextX = Math.floor(posX / 32) + 1;
        let nextY = Math.floor(posY / 32);


        if (tileMap[nextY][nextX] === ' ' || tileMap[nextY][nextX] === 'P' || tileMap[nextY][nextX] === 'r' || tileMap[nextY][nextX] === 'o' || tileMap[nextY][nextX] === 'p') {
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
            return true;
        }
        else if (tileMap[nextY][nextX] === ' ' || tileMap[nextY][nextX] === 'P' || tileMap[nextY][nextX] === 'r' || tileMap[nextY][nextX] === 'o' || tileMap[nextY][nextX] === 'p') {
            return true;

        }
        else
            return false;
    }

    checkUpPosition(posX, posY) {
        let nextX = Math.floor((posX / 32));
        let nextY = Math.floor((posY / 32)) - 1;
        console.log(nextX, nextY, tileMap[nextY][nextX])
        // addition logic for starting y value

        if ((nextY * 32 + this.height) !== posY) {
            return true;
        }
        else if (tileMap[nextY][nextX] === ' ' || tileMap[nextY][nextX] === 'P' || tileMap[nextY][nextX] === 'r' || tileMap[nextY][nextX] === 'o' || tileMap[nextY][nextX] === 'p') {
            return true;
        }
        else
            return false;
    }

    checkDownPosition(posX, posY) {
        let nextX = Math.floor(posX / 32);
        let nextY = Math.floor(posY / 32) + 1;


        if (tileMap[nextY][nextX] === ' ' || tileMap[nextY][nextX] === 'P' || tileMap[nextY][nextX] === 'r' || tileMap[nextY][nextX] === 'o' || tileMap[nextY][nextX] === 'p') {
            return true;

        }
        else
            return false;
    }
};