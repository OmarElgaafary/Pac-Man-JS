import { ctx } from "./pac-man.js";

const pipeHorizontal = new Image();
pipeHorizontal.src = '../pac-walls/pipeHorizontal.png'

const pipeVertical = new Image();
pipeVertical.src = '../pac-walls/pipeVertical.png'

const capRight = new Image();
capRight.src = '../pac-walls/capRight.png'

const capLeft = new Image();
capLeft.src = '../pac-walls/capLeft.png'

const capTop = new Image();
capTop.src = '../pac-walls/capTop.png'

const capBottom = new Image();
capBottom.src = '../pac-walls/capBottom.png'

const pipeCorner1 = new Image();
pipeCorner1.src = '../pac-walls/pipeCorner1.png'

const pipeCorner2 = new Image();
pipeCorner2.src = '../pac-walls/pipeCorner2.png'

const pipeCorner3 = new Image();
pipeCorner3.src = '../pac-walls/pipeCorner3.png'

const pipeCorner4 = new Image();
pipeCorner4.src = '../pac-walls/pipeCorner4.png'

const pipeConnectorBottom = new Image();
pipeConnectorBottom.src = '../pac-walls/pipeConnectorBottom.png'

const pipeConnectorTop = new Image();
pipeConnectorTop.src = '../pac-walls/pipeConnectorTop.png'

const pipeConnectorLeft = new Image();
pipeConnectorLeft.src = '../pac-walls/pipeConnectorLeft.png'

const pipeConnectorRight = new Image();
pipeConnectorRight.src = '../pac-walls/pipeConnectorRight.png'


export class Block {
    width = 32;
    height = 32;
    blockChar;
    position;

    constructor(position, blockChar) {
        // Constructor initalizes block coordinates

        this.position =
        {
            x: position.x,
            y: position.y
        };
        this.blockChar = blockChar;
    }

    drawBlock() {
        // Fn draws individual block on HTML canvas
        ctx.fillStyle = 'blue';
        switch (this.blockChar) {
            case '-':
                ctx.drawImage(pipeHorizontal, this.position.x * this.width, this.position.y * this.height);
                break;
            case '|':
                ctx.drawImage(pipeVertical, this.position.x * this.width, this.position.y * this.height);
                break;
            case ']': // right cap
                ctx.drawImage(capRight, this.position.x * this.width, this.position.y * this.height);
                break;
            case '[': // left cap
                ctx.drawImage(capLeft, this.position.x * this.width, this.position.y * this.height);
                break;
            case 'T': // top cap
                ctx.drawImage(capTop, this.position.x * this.width, this.position.y * this.height);
                break;
            case '_': // bottom cap
                ctx.drawImage(capBottom, this.position.x * this.width, this.position.y * this.height);
                break;
            case '<': // top left corner
                ctx.drawImage(pipeCorner1, this.position.x * this.width, this.position.y * this.height);
                break;
            case '>': // top right corner
                ctx.drawImage(pipeCorner2, this.position.x * this.width, this.position.y * this.height);
                break;
            case '}': // bottom right corner
                ctx.drawImage(pipeCorner3, this.position.x * this.width, this.position.y * this.height);
                break;
            case '{': // bottom left corner
                ctx.drawImage(pipeCorner4, this.position.x * this.width, this.position.y * this.height);
                break;
            case '~': // bottom pipe connector
                ctx.drawImage(pipeConnectorBottom, this.position.x * this.width, this.position.y * this.height);
                break;
            case '^': // top pipe connector
                ctx.drawImage(pipeConnectorTop, this.position.x * this.width, this.position.y * this.height);
                break;

            case '(': // left pipe connector
                ctx.drawImage(pipeConnectorLeft, this.position.x * this.width, this.position.y * this.height);
                break;
            case ')': // right pipe connector
                ctx.drawImage(pipeConnectorRight, this.position.x * this.width, this.position.y * this.height);
                break;


        }

    }
};