import {GameObject} from "./GameObject.js";

class Moveable extends GameObject {
    constructor(x, y, board) {
        super(x, y);
        this.board = board;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.diraction = "right";
        this.speed = 1;
    }

    Tick() {
        if (this.velocity_x != 0 && this.board[this.y][this.x + this.velocity_x] != 1) {
            this.x = this.x + this.velocity_x;
        } else if (this.velocity_y != 0 && this.board[this.y + this.velocity_y][this.x] != 1) {
            this.y = this.y + this.velocity_y;
        } else {
            this.stop();
        }

        if (this.x < 0) {
            this.x = 22
        }
        if (this.x >= 23) {
            this.x = 0
        }
    }

    up() {
        this.velocity_y = -this.speed;
        this.diraction = "up";
    }

    right() {
        this.velocity_x = this.speed;
        this.diraction = "right";
    }

    down() {
        this.velocity_y = this.speed;
        this.diraction = "down";
    }

    left() {
        this.velocity_x = -this.speed;
        this.diraction = "left";
    }

    stop() {
        this.velocity_x = 0;
        this.velocity_y = 0;
    }
}

export {Moveable};
