import { Pellets, ctx } from "./pac-man.js";

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

    drawPellets() {
        Pellets.forEach((pellet) => {
            this.drawPellet(pellet);
        });
    }
};

