import { Pellets, ctx } from "./pac-man.js";

const pacStrawBerry = new Image();
pacStrawBerry.src = '../pac-fruits/pac-strawberry.png';

const pacCherry = new Image();
pacCherry.src = '../pac-fruits/pac-cherry.png';

const pacApple = new Image();
pacApple.src = '../pac-fruits/pac-apple.png';



export class Pellet {
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

    drawFruit(fruit) {
        if (fruit.name === 'strawberry') {
            ctx.drawImage(pacStrawBerry, fruit.x * this.width, fruit.y * this.height)
        }
        else if (fruit.name === 'cherry') {
            ctx.drawImage(pacCherry, fruit.x * this.width, fruit.y * this.height)
        }
        else if (fruit.name === 'apple') {
            ctx.drawImage(pacApple, fruit.x * this.width, fruit.y * this.height)
        }
    }

    drawPellets() {
        Pellets.forEach((pellet) => {
            this.drawPellet(pellet);
        });
    }
};

