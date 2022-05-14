import {GameObject} from "./GameObject.js";

class Wall extends GameObject {
    constructor(x, y) {
        super(x, y);
    }

    Render(context) {
        context.beginPath();
        context.rect(this.x * this.width, this.y * this.height, this.width, this.height);
        context.fillStyle = "grey"; //color
        context.fill();
    }
}

export {Wall};
