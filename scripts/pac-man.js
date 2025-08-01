import { PacMap, blockRow, blockColumn } from "./pac-map.js";
import { Pellet } from "./pellet.js";
import { Player } from "./player.js";
import { Ghost } from "./ghosts.js";

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');


export let Blocks = [];
export let Pellets = [];

const scoreBoard = document.querySelector('.score');
const eatFruitScore = document.querySelector('.fruitScore');

canvas.height = blockRow * 32;
canvas.width = blockColumn * 32;

export let tileMap = [
    "<--------^-------->",
    "|        |        |",
    "| [] [-] _ [-] [] |",
    "|                 |",
    "| [] T [---] T [] |",
    "|    |       |    |",
    "{--> (--] [--) <--}",
    "OOO| |OOOOOOO| |OOO",
    "<--} _O[---]O_ {-->",
    "|    OOOorpOOO    |",
    "{--> TO[---]OT <--}",
    "OOO| |OOOfOOO| |OOO",
    "<--} _O[-^-]O_ {-->",
    "|        |        |",
    "| [> [-] _ [-] <] |",
    "|  |     P     |  |",
    "(] _ T [-^-] T _ [)",
    "|    |   |   |    |",
    "| [--~-] _ [-~--] |",
    "|                 |",
    "{-----------------}"
];

let gameScore = 0;
let gameStatus = false;


tileMap = tileMap.map(substring => substring.split(''));

class PacMan extends Player {

    position = {};
    keysDown = new Set();

    currentKey = '';
    queuedKey = '';

    imgRight = document.getElementById('pac-right');
    imgLeft = document.getElementById('pac-left');
    imgUp = document.getElementById('pac-up');
    imgDown = document.getElementById('pac-down');

    lastKey = 'ArrowRight';

    constructor(position) {
        // Constructor finds coordinates of pac-man using findPac() fn and initalizes pac-man's position
        super(position);
        let [x, y] = this.findPac();
        this.position.x = x * this.width;
        this.position.y = y * this.height;
    }

    findPac() {
        // Finds pac-man's position on the 2D array 'tileMap'

        for (let i = 0; i < blockRow; i++) {
            for (let j = 0; j < blockColumn; j++) {
                if (tileMap[i][j] === 'P')
                    return [j, i];
            }
        }
        return [-1, -1];
    }

    drawPac() {
        // Draws pac-man
        if (this.currentKey === 'ArrowRight') ctx.drawImage(this.imgRight, this.position.x, this.position.y);
        else if (this.currentKey === 'ArrowLeft') ctx.drawImage(this.imgLeft, this.position.x, this.position.y);
        else if (this.currentKey === 'ArrowUp') ctx.drawImage(this.imgUp, this.position.x, this.position.y);
        else if (this.currentKey === 'ArrowDown') ctx.drawImage(this.imgDown, this.position.x, this.position.y);
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
                    gameStatus = true;
                }
                else {
                    this.queuedKey = e.key;
                }
            }

        });
    }

    updatePosition() {

        // calls checkKeys() to update active keys


        // checkQueuedPositions() goes through all 4 directions and determines if a queued direction's next block is available and reasigns current key if available

        this.checkQueuedPositions();



        // Whichever direction is currently assigned to the 'currentKey' variable is used to move pac-man a distance 2.5px in the corresponding direction

        if (this.currentKey === 'ArrowLeft' && this.checkLeftPosition(this.position.x, this.position.y)) {
            this.position.x -= 2;
            pacMan.position.y = Math.floor(pacMan.position.y / 32) * 32;
        }
        else if (this.currentKey === 'ArrowRight' && this.checkRightPosition(this.position.x, this.position.y)) {
            this.position.x += 2;
            pacMan.position.y = Math.floor(pacMan.position.y / 32) * 32;
        }
        else if (this.currentKey === 'ArrowUp' && this.checkUpPosition(this.position.x, this.position.y)) {
            this.position.y -= 2;
            pacMan.position.x = Math.floor(pacMan.position.x / 32) * 32;
        }
        else if (this.currentKey === 'ArrowDown' && this.checkDownPosition(this.position.x, this.position.y)) {
            pacMan.position.x = Math.floor(pacMan.position.x / 32) * 32;
            this.position.y += 2;
        }
        // if no arrow keys are pressed, canvas will draw pac-man direction of the last key pressed



        // tracks current position of pac-man on the grid represented by the char 'P'

        pacMan.trackPac();

        // Gray pac-man hitbox

        ctx.strokeStyle = "white";
        ctx.strokeRect(this.position.x * this.width, this.position.y * this.height, this.width, this.height);
    }

    checkQueuedPositions() {

        if (this.currentKey === this.queuedKey) {
            this.queuedKey = null;
            return;
        }


        if ((this.queuedKey === 'ArrowRight' && this.checkRightPosition(this.position.x, this.position.y))
            || (this.queuedKey === 'ArrowLeft' && this.checkLeftPosition(this.position.x, this.position.y))
            || (this.queuedKey === 'ArrowUp' && this.checkUpPosition(this.position.x, this.position.y))
            || (this.queuedKey === 'ArrowDown' && this.checkDownPosition(this.position.x, this.position.y))) {
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
                gameScore += 10;
                return;
            }
        }

    }

    trackPac() {

        let pacY = Math.floor(this.position.y / 32);
        let pacX = Math.floor(this.position.x / 32);

        for (let i = 0; i < blockRow; i++) {
            for (let j = 0; j < blockColumn; j++) {
                if (tileMap[i][j] === 'P')
                    tileMap[i][j] = ' ';
                tileMap[pacY][pacX] = 'P';
            }
        }
    }

    checkRightPosition(posX, posY) {
        let nextX = Math.floor(posX / 32) + 1;
        let nextY = Math.floor(posY / 32);


        if (tileMap[nextY][nextX] === ' ' ||
            tileMap[nextY][nextX] === 'P' ||
            tileMap[nextY][nextX] === 'r' ||
            tileMap[nextY][nextX] === 'o' ||
            tileMap[nextY][nextX] === 'p' ||
            tileMap[nextY][nextX] === 'f' ||
            tileMap[nextY][nextX] === 'O') {
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
        else if (tileMap[nextY][nextX] === ' ' ||
            tileMap[nextY][nextX] === 'P' ||
            tileMap[nextY][nextX] === 'r' ||
            tileMap[nextY][nextX] === 'o' ||
            tileMap[nextY][nextX] === 'p' ||
            tileMap[nextY][nextX] === 'f' ||
            tileMap[nextY][nextX] === 'O') {
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
        else if (tileMap[nextY][nextX] === ' ' ||
            tileMap[nextY][nextX] === 'P' ||
            tileMap[nextY][nextX] === 'r' ||
            tileMap[nextY][nextX] === 'o' ||
            tileMap[nextY][nextX] === 'p' ||
            tileMap[nextY][nextX] === 'f' ||
            tileMap[nextY][nextX] === 'O') {
            this.eatPellet(nextY, nextX);
            return true;
        }
        else
            return false;
    }

    checkDownPosition(posX, posY) {
        let nextX = Math.floor(posX / 32);
        let nextY = Math.floor(posY / 32) + 1;


        if (tileMap[nextY][nextX] === ' ' ||
            tileMap[nextY][nextX] === 'P' ||
            tileMap[nextY][nextX] === 'r' ||
            tileMap[nextY][nextX] === 'o' ||
            tileMap[nextY][nextX] === 'p' ||
            tileMap[nextY][nextX] === 'f' ||
            tileMap[nextY][nextX] === 'O') {
            this.eatPellet(nextY, nextX);
            return true;

        }
        else
            return false;
    }

    getPacPosition() {
        return this.position;
    }


};

function isGameOver(pacPosition, ghostPosition) {
    if (Math.floor(pacPosition.x / 32) === Math.floor(ghostPosition.x / 32) && Math.floor(pacPosition.y / 32) === Math.floor(ghostPosition.y / 32)) {
        gameStatus = false;
        ctx.fillStyle = 'Red';
        ctx.font = '28px "Press Start 2P", system-ui';
        ctx.fillText('Game Over', 6 * pacMan.width, 10 * pacMan.height);

    }
    else if (Pellets.length === 0) {
        gameStatus = false;
        ctx.fillStyle = 'Green';
        ctx.font = '28px "Press Start 2P", system-ui';
        ctx.fillText('You win!', 6 * pacMan.width, 10 * pacMan.height);
    }
}
let timeRunning = true;
function eatFruit(pacPosition, fruit) {
    if (Math.floor(pacPosition.x / 32) === fruit.x && Math.floor(pacPosition.y / 32) === fruit.y && fruit.status !== false) {
        fruit.name = '';
        fruit.status = false;
        gameScore += 100;
    }
    else if (!fruit.status && timeRunning) {
        eatFruitScore.innerHTML = '100!';
        setTimeout(() => {
            eatFruitScore.innerHTML = '';
            timeRunning = false
        }, 1000);
    }
}


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

let redGhost = new Ghost({
    x: 3,
    y: 3
}, 'r');

let orangeGhost = new Ghost({
    x: 3,
    y: 3
}, 'o');

let pinkGhost = new Ghost({
    x: 3,
    y: 3
}, 'p');



function drawAnimationLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pacMap.drawBlocks();
    pacPellets.drawPellets();
    pacPellets.drawFruit(pacMap.fruit);
    pacMan.drawPac();
    eatFruit(pacMan.position, pacMap.fruit);
    redGhost.drawGhost();
    orangeGhost.drawGhost();
    pinkGhost.drawGhost();

    pacMan.checkKeys();

    if (gameStatus) {
        pacMan.updatePosition();
        redGhost.ghostMovement();
        orangeGhost.ghostMovement();
        pinkGhost.ghostMovement();
    }



    isGameOver(pacMan.getPacPosition(), redGhost.getGhostPosition());
    isGameOver(pacMan.getPacPosition(), pinkGhost.getGhostPosition());
    isGameOver(pacMan.getPacPosition(), orangeGhost.getGhostPosition());

    redGhost.trackGhost();
    pinkGhost.trackGhost();
    orangeGhost.trackGhost();


    scoreBoard.innerHTML = `High Score: ${gameScore}`;

    requestAnimationFrame(drawAnimationLoop);

}

drawAnimationLoop();

