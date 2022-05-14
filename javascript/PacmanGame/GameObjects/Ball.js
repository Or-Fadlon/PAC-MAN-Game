import {Eatable} from "./Eatable.js";

class Ball extends Eatable {
    constructor(x, y, color, points) {
        super(x, y, "ball");
        this.color = color;
        this.points = points;
    }

    Render(context) {
        let width = this.width;
        let height = this.height;
        let center = new Object();
        center.x = this.x * width + 0.5 * width;
        center.y = this.y * height + 0.5 * height;
        context.beginPath();
        context.arc(center.x, center.y, 0.25 * width, 0, 2 * Math.PI); // circle
        context.fillStyle = this.color; //color
        context.fill();
    }
}

export {Ball};
