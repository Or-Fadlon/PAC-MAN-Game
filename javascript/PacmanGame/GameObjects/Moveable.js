import {GameObject} from "./GameObject.js";

class Moveable extends GameObject {
    constructor(x, y, walls) {
        super(x, y);
        this.walls = walls;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.diraction = "right";
        this.speed = 1;
    }

    Tick() {
        this.prev_x = this.x;
        this.prev_y = this.y;

        let old_x = this.x;
        let old_y = this.y;
        this.x = this.x + this.velocity_x;
        this.y = this.y + this.velocity_y;
        
        let can_move = true;
        for (let i = 0; i < this.walls.length; i++) {
            if (this.IsCollide(this.walls[i])) {
                can_move = false;
                break;
            }            
        }

        if (!can_move) {
            this.x = old_x;
            this.y = old_y;
            this.Stop()
        }

        if (this.x < 0) {
            this.x = 22
        }
        if (this.x >= 23) {
            this.x = 0
        }
    }

    Up() {
        this.Stop();
        this.velocity_y = -this.speed;
        this.diraction = "up";
    }

    Right() {
        this.Stop();
        this.velocity_x = this.speed;
        this.diraction = "right";
    }

    Down() {
        this.Stop();
        this.velocity_y = this.speed;
        this.diraction = "down";
    }

    Left() {
        this.Stop();
        this.velocity_x = -this.speed;
        this.diraction = "left";
    }

    Stop() {
        this.velocity_x = 0;
        this.velocity_y = 0;
    }
}

export {Moveable};
