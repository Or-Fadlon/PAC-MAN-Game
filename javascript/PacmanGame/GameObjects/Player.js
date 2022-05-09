import {Moveable} from "./Moveable.js";

class Player extends Moveable {
    constructor(x, y, board) {
        super(x, y, board);
        this.pac_mouth_open = true;
        this.pac_mouth = 0;
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

        context.beginPath();
        if (this.diraction == "up") {
            context.arc(center.x + width * 0.25, center.y - width * 0.083, width * 0.15, 0, 2 * Math.PI); // circle
        } else if (this.diraction == "down") {
            context.arc(center.x + width * 0.25, center.y - width * 0.083, width * 0.15, 0, 2 * Math.PI); // circle
        } else if (this.diraction == "left") {
            context.arc(center.x + width * 0.083, center.y - width * 0.25, width * 0.15, 0, 2 * Math.PI); // circle
        } else if (this.diraction == "right") {
            context.arc(center.x + width * 0.083, center.y - width * 0.25, width * 0.15, 0, 2 * Math.PI); // circle
        }
        context.fillStyle = "white"; //color
        context.fill();

        context.beginPath();
        if (this.diraction == "up") {
            context.arc(center.x + width * 0.25, center.y - width * 0.083, width * 0.083, 0, 2 * Math.PI); // circle
        } else if (this.diraction == "down") {
            context.arc(center.x + width * 0.25, center.y - width * 0.083, width * 0.083, 0, 2 * Math.PI); // circle
        } else if (this.diraction == "left") {
            context.arc(center.x + width * 0.083, center.y - width * 0.25, width * 0.083, 0, 2 * Math.PI); // circle
        } else if (this.diraction == "right") {
            context.arc(center.x + width * 0.083, center.y - width * 0.25, width * 0.083, 0, 2 * Math.PI); // circle
        }
        context.fillStyle = "#0048FF"; //color
        context.fill();

        if (this.pac_mouth_open) {
            this.pac_mouth_open = false;
            this.pac_mouth = 0.20;
        } else {
            this.pac_mouth_open = true;
            this.pac_mouth = 0;
        }
    }

    IsColide(other) {
        return other.x == this.x && other.y == this.y;
    }
}

export {Player};
