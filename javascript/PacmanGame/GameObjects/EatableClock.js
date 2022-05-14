import { Eatable } from "./Eatable.js";
class EatableClock extends Eatable {
    constructor(x, y) {
        super(x, y, "clock");
        this.time = 10;
        this.image = new Image(this.width, this.height); // Using optional size for image
        this.image.src = "./resources/images/clock.png";
    }

    Render(context) {
        context.drawImage(this.image, this.x * this.width, this.y * this.height, this.width, this.height);
    }
}
export {EatableClock};