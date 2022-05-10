import {Moveable} from "./Moveable.js";

class MovingEatable extends Moveable {
    constructor(x, y, board, color = "red") {
        super(x, y);
        this.board = board;
        this.color = color;
        this.points = 50;
    }

    Tick() {
        if (this.velocity_x == 0 && this.velocity_y ==0) {
            let move = Math.floor(Math.random() * 4);
            if (move == 0) {
                this.up();
            } else if (move == 1) {
                this.right();
            } else if (move == 2) {
                this.down();
            } else if (move == 3) {
                this.left();
            }
        }

        super.Tick();
    }

    Render(context) {
        let width = this.width;
        let height = this.height;
        let center = new Object();
        center.x = this.x * width + 0.5 * width;
        center.y = this.y * height + 0.5 * height;
        context.beginPath();
        context.rect(
            center.x - 0.5 * width,
            center.y - 0.5 * height,
            width,
            height
        );
        context.fillStyle = this.color; //color
        context.fill();
    }
}

export {MovingEatable};
