import {GameObject} from "./GameObject.js";

class Moveable extends GameObject {
    constructor(x, y, board) {
        super(x, y);
        this.board = board;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.diraction = "right";
    }

    Tick() {
        if (this.velocity_x != 0 && this.board[this.y][this.x + this.velocity_x] != 1) {
            this.x = this.x + this.velocity_x;
        } else if (this.velocity_y != 0 && this.board[this.y + this.velocity_y][this.x] != 1) {
            this.y = this.y + this.velocity_y;
        }
    }

    up() {
        this.velocity_y = -1;
        this.diraction = "up";
    }

    right() {
        this.velocity_x = 1;
        this.diraction = "right";
    }

    down() {
        this.velocity_y = 1;
        this.diraction = "down";
    }

    left() {
        this.velocity_x = -1;
        this.diraction = "left";
    }

    stop() {
        this.velocity_x = 0;
        this.velocity_y = 0;
    }
}

export {Moveable};
