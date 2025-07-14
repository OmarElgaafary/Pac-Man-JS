const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;

let tileMap = [
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

tileMap = tileMap.map(substring => substring.split(''));

console.log(tileMap);

let Blocks = [];
let Pellets = [];

class Block {
    width = 32;
    height = 32;
    position;

    constructor(position) {
        // Constructor initalizes block coordinates

        this.position =
        {
            x: position.x,
            y: position.y
        };
    }

    drawBlock() {
        // Fn draws individual block on HTML canvas

        ctx.fillStyle = 'blue';
        ctx.fillRect(this.position.x * this.width, this.position.y * this.height, this.width, this.height);
    }
};

class PacMap extends Block {
    blockRow = 21;
    blockColumn = 19;

    constructor(position) {
        super(position);
        this.createBlocks();
        this.createPellets();
    }

    createBlocks() {
        // Creates map boundries in the form of 'Blocks' by finding corresponding 'X' position representing map Block.
        // Fn then pushes the found Block to an array of map blocks (Blocks); 

        for (let i = 0; i < this.blockRow; i++) {
            for (let j = 0; j < this.blockColumn; j++) {
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

        for (let i = 0; i < this.blockRow; i++) {
            for (let j = 0; j < this.blockColumn; j++) {
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

        console.log(tileMap[pacY][pacX])
    }

};

class PacMan {
    width = 32;
    height = 32;
    position = {};

    keysDown = new Set();

    imgRight = document.getElementById('pac-right');
    imgLeft = document.getElementById('pac-left');
    imgUp = document.getElementById('pac-up');
    imgDown = document.getElementById('pac-down');

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
                && !this.keysDown.has(e.key)
            ) {
                this.keysDown.add(e.key);
                this.lastKey = e.key;
            }

        });

        // If one of the active keys is released, it will be deleted from the set of active keys

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowRight'
                || e.key === 'ArrowLeft'
                || e.key === 'ArrowUp'
                || e.key === 'ArrowDown'
                && this.keysDown.has(e.key)
            )
                this.keysDown.delete(e.key)

        });
    }

    updatePosition() {
        // Fn updates pac-man's position


        // calls checkKeys() to update active keys

        this.checkKeys();

        // Whichever arrow key is held down is used to move pac-man a distance 2.5px in the corresponding direction

        if (this.keysDown.has('ArrowLeft') && this.checkLeftPosition()) {
            ctx.drawImage(this.imgLeft, this.position.x, this.position.y);
            this.position.x -= 1;
        }
        else if (this.keysDown.has('ArrowRight') && this.checkRightPosition()) {
            ctx.drawImage(this.imgRight, this.position.x, this.position.y);
            this.position.x += 1;
        }
        else if (this.keysDown.has('ArrowUp') && this.checkUpPosition()) {
            ctx.drawImage(this.imgUp, this.position.x, this.position.y);
            this.position.y -= 1;
        }
        else if (this.keysDown.has('ArrowDown') && this.checkDownPosition()) {
            ctx.drawImage(this.imgDown, this.position.x, this.position.y);
            this.position.y += 1;
        }
        // if no arrow keys are pressed, canvas will draw pac-man direction of the last key pressed

        else if (this.lastKey === 'ArrowRight') ctx.drawImage(this.imgRight, this.position.x, this.position.y);
        else if (this.lastKey === 'ArrowLeft') ctx.drawImage(this.imgLeft, this.position.x, this.position.y);
        else if (this.lastKey === 'ArrowUp') ctx.drawImage(this.imgUp, this.position.x, this.position.y);
        else if (this.lastKey === 'ArrowDown') ctx.drawImage(this.imgDown, this.position.x, this.position.y);

        // Gray pac-man hitbox

        ctx.strokeStyle = "white";
        ctx.strokeRect(this.position.x * this.width, this.position.y * this.height, this.width, this.height);
    }

    convertPixelToGrid() {
        return [Math.floor(Math.round(pacMan.position.y / 32)), Math.floor(Math.round(pacMan.position.x / 32))];
    }

    checkRightPosition() {
        let nextX = Math.floor(Math.round((pacMan.position.x - 16) / 32)) + 1;
        let nextY = Math.floor(Math.round(pacMan.position.y / 32));

        console.log(tileMap[nextY][nextX]);
        if (tileMap[nextY][nextX] === ' ' || tileMap[nextY][nextX] === 'P')
            return true;
        else
            return false;
    }

    checkLeftPosition() {
        let nextX = Math.floor(Math.round((pacMan.position.x + 16) / 32)) - 1;
        let nextY = Math.floor(Math.round(pacMan.position.y / 32));
        console.log(tileMap[nextY][nextX], nextX, nextY, pacMan.position);
        if (tileMap[nextY][nextX] === ' ' || tileMap[nextY][nextX] === 'P')
            return true;
        else
            return false;
    }

    checkUpPosition() {
        let nextX = Math.floor(Math.round(pacMan.position.x / 32));
        let nextY = Math.floor(Math.round((pacMan.position.y + 16) / 32)) - 1;

        console.log(tileMap[nextY][nextX]);
        if (tileMap[nextY][nextX] === ' ' || tileMap[nextY][nextX] === 'P')
            return true;
        else
            return false;
    }

    checkDownPosition() {
        let nextX = Math.floor(Math.round(pacMan.position.x / 32));
        let nextY = Math.floor(Math.round((pacMan.position.y - 16) / 32)) + 1;

        console.log(tileMap[nextY][nextX]);
        if (tileMap[nextY][nextX] === ' ' || tileMap[nextY][nextX] === 'P')
            return true;
        else
            return false;
    }

    eatPellet() {
        let pacX = Math.floor(pacMan.position.x / 32);
        let pacY = Math.floor(pacMan.position.y / 32);

        if (tileMap[pacY][pacX] === ' ') {
            let pelletFound;
            for (let i = 0; i < Pellets.length; i++) {
                const pellet = Pellets[i];
                if (pellet.position.x === pacX && pellet.position.y === pacY) {
                    Pellets = Pellets.filter(p => p !== pellet)
                    console.log('found ya')
                    tileMap[pacY][pacX] = 'P';
                    return;
                }
            }
        }
    }

};

class Pellet {
    height = 32;
    width = 32;
    position;


    constructor(position) {
        this.position = {
            x: position.x,
            y: position.y
        }
    }

    drawPellet(pellet) {
        ctx.fillStyle = 'white';
        ctx.fillRect(pellet.position.x * pellet.width + (pellet.width / 2), pellet.position.y * pellet.height + (pellet.height / 2), 6, 6);
    }

    drawPellets() {
        Pellets.forEach((pellet) => {
            this.drawPellet(pellet);
        });
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
    pacMan.eatPellet();

    requestAnimationFrame(drawAnimationLoop);
}
console.log(Pellets[1]);

drawAnimationLoop();

