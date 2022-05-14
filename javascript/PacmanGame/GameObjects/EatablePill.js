import { Eatable } from "./Eatable.js";

class EatablePill extends Eatable {
    constructor(x, y) {
        super(x, y, "pill");
        this.life = 1;
        this.image = new Image(this.width, this.height);
        this.image.src = "./resources/images/pill.png";
    }

    Render(context) {
        context.drawImage(this.image, this.x * this.width, this.y * this.height, this.width, this.height);
    }
}

export {EatablePill};