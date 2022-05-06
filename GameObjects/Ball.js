import { Eatable } from "./Eatable";

class Ball extends Eatable {
  constructor(x, y, color, points) {
    super(x, y);
    this.color = color;
    this.points = points;
  }
}
export { Ball };
