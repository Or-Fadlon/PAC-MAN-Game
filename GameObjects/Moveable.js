import { GameObject } from "./GameObject";

class Moveable extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.velocity_x = 0;
    this.velocity_y = 0;
  }

  Tick() {
      this.x = this.x + this.velocity_x;
      this.y = this.y + this.velocity_y;
  }
}

export { Moveable };
