import {Moveable} from "./Moveable.js";

class MovingEatable extends Moveable {
    constructor(x, y, walls, color = "red") {
        super(x, y, walls);
        this.color = color;
        this.points = 50;
        
        this.image = new Image(30, 30); // Using optional size for image
        this.image.src = "./resources/images/coin.gif";
    }

    Tick() {
        if (this.velocity_x == 0 && this.velocity_y ==0) {
            let move = Math.floor(Math.random() * 4);
            if (move == 0) {
                this.Up();
            } else if (move == 1) {
                this.Right();
            } else if (move == 2) {
                this.Down();
            } else if (move == 3) {
                this.Left();
            }
        }

        super.Tick();
    }

    Render(context) {
        context.drawImage(this.image, this.x * this.width, this.y * this.height, this.width, this.height);

        // let width = this.width;
        // let height = this.height;
        // let center = new Object();
        // center.x = this.x * width + 0.5 * width;
        // center.y = this.y * height + 0.5 * height;
        // context.beginPath();
        // context.rect(
        //     center.x - 0.5 * width,
        //     center.y - 0.5 * height,
        //     width,
        //     height
        // );
        // context.fillStyle = this.color; //color
        // context.fill();
    }
}

export {MovingEatable};
