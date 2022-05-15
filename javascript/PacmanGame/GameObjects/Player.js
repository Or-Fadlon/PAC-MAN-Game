import {Moveable} from "./Moveable.js";

class Player extends Moveable {
    constructor(x, y, walls) {
        super(x, y, walls);
        this.pac_mouth_open = true;
        this.pac_mouth = 0;
        this.next_move = "";
    }

    Tick() {
        if (this.next_move != "") {
            let old_x = this.x;
            let old_y = this.y;
            let temp_vel_x = 0;
            let temp_vel_y = 0;
            if (this.diraction == this.next_move) {
                this.next_move = "";
                super.Tick();
            } else {
                if (this.next_move == "up") {
                    temp_vel_x = 0;
                    temp_vel_y = -this.speed;
                } else if (this.next_move == "right") {
                    temp_vel_x = this.speed;
                    temp_vel_y = 0;
                } else if (this.next_move == "down") {
                    temp_vel_x = 0;
                    temp_vel_y = this.speed;
                } else if (this.next_move == "left") {
                    temp_vel_x = -this.speed;
                    temp_vel_y = 0;
                }
                this.x = this.x + temp_vel_x;
                this.y = this.y + temp_vel_y;
                
                let can_move = true;
                for (let i = 0; i < this.walls.length; i++) {
                    if (this.IsCollide(this.walls[i])) {
                        can_move = false;
                        break;
                    }            
                }
                
                this.x = old_x;
                this.y = old_y;

                if (can_move) {
                    if (this.next_move == "up") {
                        super.Up();
                    } else if (this.next_move == "right") {
                        super.Right();
                    } else if (this.next_move == "down") {
                        super.Down();
                    } else if (this.next_move == "left") {
                        super.Left();
                    }
                    this.next_move = "";
                }
                super.Tick();
            }
        } else {
            super.Tick();
        }
    }

    Render(context) {
        let width = this.width;
        let height = this.height;
        let center = new Object();
        center.x = this.x * width + 0.5 * width;
        center.y = this.y * height + 0.5 * height;
        context.beginPath();
        if (this.diraction == "up") {
            context.arc(center.x, center.y, width * 0.5, 1.65 * Math.PI + this.pac_mouth, 1.35 * Math.PI - this.pac_mouth); // half circle
        } else if (this.diraction == "down") {
            context.arc(center.x, center.y, width * 0.5, 0.65 * Math.PI + this.pac_mouth, 0.35 * Math.PI - this.pac_mouth); // half circle
        } else if (this.diraction == "left") {
            context.arc(center.x, center.y, width * 0.5, 1.15 * Math.PI + this.pac_mouth, 0.85 * Math.PI - this.pac_mouth); // half circle
        } else if (this.diraction == "right") {
            context.arc(center.x, center.y, width * 0.5, 0.15 * Math.PI + this.pac_mouth, 1.85 * Math.PI - this.pac_mouth); // half circle
        }
        context.lineTo(center.x, center.y);
        context.fillStyle = "yellow"; //color
        context.fill();

        // context.beginPath();
        // if (this.diraction == "up") {
        //     context.arc(center.x + width * 0.25, center.y - width * 0.083, width * 0.15, 0, 2 * Math.PI); // circle
        // } else if (this.diraction == "down") {
        //     context.arc(center.x + width * 0.25, center.y - width * 0.083, width * 0.15, 0, 2 * Math.PI); // circle
        // } else if (this.diraction == "left") {
        //     context.arc(center.x + width * 0.083, center.y - width * 0.25, width * 0.15, 0, 2 * Math.PI); // circle
        // } else if (this.diraction == "right") {
        //     context.arc(center.x + width * 0.083, center.y - width * 0.25, width * 0.15, 0, 2 * Math.PI); // circle
        // }
        // context.fillStyle = "white"; //color
        // context.fill();

        // context.beginPath();
        // if (this.diraction == "up") {
        //     context.arc(center.x + width * 0.25, center.y - width * 0.083, width * 0.083, 0, 2 * Math.PI); // circle
        // } else if (this.diraction == "down") {
        //     context.arc(center.x + width * 0.25, center.y - width * 0.083, width * 0.083, 0, 2 * Math.PI); // circle
        // } else if (this.diraction == "left") {
        //     context.arc(center.x + width * 0.083, center.y - width * 0.25, width * 0.083, 0, 2 * Math.PI); // circle
        // } else if (this.diraction == "right") {
        //     context.arc(center.x + width * 0.083, center.y - width * 0.25, width * 0.083, 0, 2 * Math.PI); // circle
        // }
        // context.fillStyle = "#0048FF"; //color
        // context.fill();

        if (this.pac_mouth_open) {
            this.pac_mouth_open = false;
            this.pac_mouth = 0.30;
        } else {
            this.pac_mouth_open = true;
            this.pac_mouth = -0.25;
        }
    }

    Up() {
        this.next_move = "up";
    }

    Right() {
        this.next_move = "right";
    }

    Down() {
        this.next_move = "down";
    }

    Left() {
        this.next_move = "left";
    }
}

export {Player};
