import { Block } from "./block.js";
import { PacMap } from "./pac-map.js";
import { Pellet } from "./pellet.js";

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');

export let Blocks = [];
export let Pellets = [];

canvas.height = innerHeight;
canvas.width = innerWidth;

export let tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XX XX X XXXX",
    "X                 X",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX"
];

let gameScore = 0;

tileMap = tileMap.map(substring => substring.split(''));


class PacMan {
    width = 32;
    height = 32;
    position = {};

    keysDown = new Set();

    currentKey = '';
    queuedKey = '';

    imgRight = document.getElementById('pac-right');
    imgLeft = document.getElementById('pac-left');
    imgUp = document.getElementById('pac-up');
    imgDown = document.getElementById('pac-down');
    redDot = document.getElementById('red-dot');

    lastKey = 'ArrowRight';

    constructor() {
        // Constructor finds coordinates of pac-man using findPac() fn and initalizes pac-man's position

        let [x, y] = this.findPac();
        this.position.x = x * this.width;
        this.position.y = y * this.height;
    }

    findPac() {
        // Finds pac-man's position on the 2D array 'tileMap'

        for (let i = 0; i < 21; i++) {
            for (let j = 0; j < 19; j++) {
                if (tileMap[i][j] === 'P')
                    return [j, i];
            }
        }
        return [-1, -1];
    }

    drawPac() {
        // Draws pac-man
        ctx.drawImage(this.imgRight, this.position.x, this.position.y);
    }

    checkKeys() {
        // Event listeners for key down, if an arrow key is held down it psuhes it to a set of active keys

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp'
                || e.key === 'ArrowDown'
                || e.key === 'ArrowLeft'
                || e.key === 'ArrowRight'
            ) {

                if (this.currentKey === '') {
                    this.currentKey = e.key;
                }
                else {
                    this.queuedKey = e.key;
                }
            }

        });
    }

    updatePosition() {

        // calls checkKeys() to update active keys

        this.checkKeys();

        // checkQueuedPositions() goes through all 4 directions and determines if a queued direction's next block is available and reasigns current key if available

        this.checkQueuedPositions();



        // Whichever direction is currently assigned to the 'currentKey' variable is used to move pac-man a distance 2.5px in the corresponding direction

        if (this.currentKey === 'ArrowLeft' && this.checkLeftPosition()) {
            this.position.x -= 2;
            pacMan.position.y = Math.floor(pacMan.position.y / 32) * 32;
            ctx.drawImage(this.imgLeft, this.position.x, this.position.y);
        }
        else if (this.currentKey === 'ArrowRight' && this.checkRightPosition()) {
            this.position.x += 2;
            pacMan.position.y = Math.floor(pacMan.position.y / 32) * 32;
            ctx.drawImage(this.imgRight, this.position.x, this.position.y);
        }
        else if (this.currentKey === 'ArrowUp' && this.checkUpPosition()) {
            this.position.y -= 2;
            pacMan.position.x = Math.floor(pacMan.position.x / 32) * 32;
            ctx.drawImage(this.imgUp, this.position.x, this.position.y);
        }
        else if (this.currentKey === 'ArrowDown' && this.checkDownPosition()) {
            pacMan.position.x = Math.floor(pacMan.position.x / 32) * 32;
            this.position.y += 2;
            ctx.drawImage(this.imgDown, this.position.x, this.position.y);
        }
        // if no arrow keys are pressed, canvas will draw pac-man direction of the last key pressed

        if (this.currentKey === 'ArrowRight') ctx.drawImage(this.imgRight, this.position.x, this.position.y);
        else if (this.currentKey === 'ArrowLeft') ctx.drawImage(this.imgLeft, this.position.x, this.position.y);
        else if (this.currentKey === 'ArrowUp') ctx.drawImage(this.imgUp, this.position.x, this.position.y);
        else if (this.currentKey === 'ArrowDown') ctx.drawImage(this.imgDown, this.position.x, this.position.y);

        // Gray pac-man hitbox

        ctx.strokeStyle = "white";
        ctx.strokeRect(this.position.x * this.width, this.position.y * this.height, this.width, this.height);
    }

    convertPixelToGrid() {
        // converts pacman's position in pixels to his [i, j] position's on the 'tileMap' grid
        return [Math.floor(pacMan.position.y / 32), Math.floor(pacMan.position.x / 32)];
    }

    checkRightPosition() {
        let nextX = Math.floor(pacMan.position.x / 32) + 1;
        let nextY = Math.floor(pacMan.position.y / 32);


        if (tileMap[nextY][nextX] === ' ' || tileMap[nextY][nextX] === 'P') {
            this.eatPellet(nextY, nextX);
            return true;
        }
        else
            return false;
    }

    checkLeftPosition() {
        let nextX = Math.floor((pacMan.position.x + pacMan.width - 1) / 32) - 1;
        let nextY = Math.floor(pacMan.position.y / 32);

        // addition logic for starting x value

        if ((nextX * 32 + pacMan.width !== pacMan.position.x)) {
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

    checkUpPosition() {
        let nextX = Math.floor((pacMan.position.x / 32));
        let nextY = Math.floor((pacMan.position.y / 32)) - 1;

        // addition logic for starting y value

        if ((nextY * 32 + pacMan.height) !== pacMan.position.y) {
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

    checkDownPosition() {
        let nextX = Math.floor(pacMan.position.x / 32);
        let nextY = Math.floor(pacMan.position.y / 32) + 1;


        if (tileMap[nextY][nextX] === ' ' || tileMap[nextY][nextX] === 'P') {
            this.eatPellet(nextY, nextX);
            return true;

        }
        else
            return false;
    }

    checkQueuedPositions() {

        if (this.currentKey === this.queuedKey) {
            this.queuedKey = null;
            return;
        }


        if ((this.queuedKey === 'ArrowRight' && this.checkRightPosition())
            || (this.queuedKey === 'ArrowLeft' && this.checkLeftPosition())
            || (this.queuedKey === 'ArrowUp' && this.checkUpPosition())
            || (this.queuedKey === 'ArrowDown' && this.checkDownPosition())) {
            this.currentKey = this.queuedKey;
            this.queuedKey = null
            return;

        }
    }

    eatPellet(pacY, pacX) {

        let pelletFound;
        for (let i = 0; i < Pellets.length; i++) {
            const pellet = Pellets[i];
            if (pellet.position.x === pacX && pellet.position.y === pacY) {
                Pellets = Pellets.filter(p => p !== pellet)
                gameScore += 5;
                return;
            }
        }

    }

    drawRed() {
        for (let i = 0; i < 21; i++) {
            for (let j = 0; j < 19; j++) {
                if (tileMap[i][j] === 'P') {
                    ctx.fillStyle = 'red';
                    ctx.fillRect(j * 32, i * 32, 8, 8);
                }
            }
        }
    }

    trackPac() {

        let pacY = Math.floor(this.position.y / 32);
        let pacX = Math.floor(this.position.x / 32);

        for (let i = 0; i < 21; i++) {
            for (let j = 0; j < 19; j++) {
                if (tileMap[i][j] === 'P')
                    tileMap[i][j] = ' ';
                tileMap[pacY][pacX] = 'P';
            }
        }
    }

};


let pacMap = new PacMap({
    x: 0,
    y: 0
});

let pacMan = new PacMan(
    {
        x: 1,
        y: 1
    }
);

let pacPellets = new Pellet({
    x: 1,
    y: 1
});


function drawAnimationLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pacMap.drawBlocks();
    pacPellets.drawPellets();
    pacMan.updatePosition();
    pacMan.trackPac();
    pacMan.drawRed();

    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${gameScore}`, 700, 100);

    requestAnimationFrame(drawAnimationLoop);
}

drawAnimationLoop();

