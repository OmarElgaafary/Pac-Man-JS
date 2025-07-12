import * as block from './block.js';

const c = document.querySelector('canvas');
const canvas = c.getContext('2d');
// canvas dimensions & graphics
c.width = innerWidth;
c.height = innerHeight;


// title map 21 rows by 19 columns

const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
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

let Blocks = [];

class Block {
    position;
    width = 32;
    height = 32;

    constructor(position) {
        this.position =
        {
            x: position.x * this.width,
            y: position.y * this.height
        };
    }

    drawBlock(content) {
        content.fillStyle = "blue";
        content.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
};


class Map {
    blockRow = 21;
    blockColumn = 19;

    initalizeBlocks() {
        console.log('running');

        for (let i = 0; i < tileMap.length; i++) {
            const currentString = tileMap[i];
            for (let j = 0; j < currentString.length; j++) {
                const currentChar = currentString[j];

                if (currentChar === 'X') {

                    Blocks.push(new Block({
                        x: j,
                        y: i
                    }));
                }
            }
        }

    }

    drawBlocks() {
        Blocks.forEach((Block) => {
            Block.drawBlock(canvas);
        });
    }

};

class PacMan extends Block {
    image;
    speed = 5;
    keysDown = new Set();
    imgRight = document.getElementById('pac-right');
    imgLeft = document.getElementById('pac-left');
    imgUp = document.getElementById('pac-up');
    imgDown = document.getElementById('pac-down');
    lastKey = 'ArrowRight';

    constructor(position) {
        super(position);
    }

    checkKeys() {
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

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowRight'
                || e.key === 'ArrowLeft'
                || e.key === 'ArrowUp'
                || e.key === 'ArrowDown')
                this.keysDown.delete(e.key)

        });
    }

    updatePosition() {
        this.checkKeys();
        if (this.keysDown.has('ArrowLeft')) {
            canvas.drawImage(this.imgLeft, this.position.x, this.position.y);
            this.position.x -= 5;
        }
        else if (this.keysDown.has('ArrowRight')) {
            canvas.drawImage(this.imgRight, this.position.x, this.position.y);
            this.position.x += 5;
        }
        else if (this.keysDown.has('ArrowUp')) {
            canvas.drawImage(this.imgUp, this.position.x, this.position.y);
            this.position.y -= 5;
        }
        else if (this.keysDown.has('ArrowDown')) {
            canvas.drawImage(this.imgDown, this.position.x, this.position.y);
            this.position.y += 5;
        }
        else if (this.lastKey === 'ArrowRight') canvas.drawImage(this.imgRight, this.position.x, this.position.y);
        else if (this.lastKey === 'ArrowLeft') canvas.drawImage(this.imgLeft, this.position.x, this.position.y);
        else if (this.lastKey === 'ArrowUp') canvas.drawImage(this.imgUp, this.position.x, this.position.y);
        else if (this.lastKey === 'ArrowDown') canvas.drawImage(this.imgDown, this.position.x, this.position.y);
    }

    drawPac(content) {
        content.fillStyle = "yellow";
        content.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
};

let pacMap = new Map();
let pacMan = new PacMan({
    x: 1,
    y: 1
});
pacMap.initalizeBlocks();

function drawAnimation() {
    canvas.clearRect(0, 0, c.width, c.height);
    pacMap.drawBlocks();
    pacMan.updatePosition();
    requestAnimationFrame(drawAnimation)
}


drawAnimation();


