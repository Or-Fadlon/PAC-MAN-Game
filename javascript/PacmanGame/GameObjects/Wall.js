import {GameObject} from "./GameObject.js";

class Wall extends GameObject {
    constructor(x, y) {
        super(x, y);
    }

    Render(context) {
        context.beginPath();
        context.rect(this.x * this.width + 2.5, this.y * this.height + 2.5, this.width - 5, this.height - 5);
        context.fillStyle = "#4265ff"; //color
        context.fill();
    }
}

export {Wall};
