import { ctx } from "./pac-man.js";

export class Block {
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