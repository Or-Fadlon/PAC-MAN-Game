import { GameObject } from "./GameObject.js";

class Wall extends GameObject {
  constructor(x, y) {
    super(x, y);
  }
  Render(context) {
    let width = this.width;
    let height = this.height;
    let center = new Object();
    center.x = this.x * width + 0.5 * width;
    center.y = this.y * height + 0.5 * height;
    context.beginPath();
    context.rect(center.x - 0.5 * width, center.y - 0.5 * height, width, height);
    context.fillStyle = "grey"; //color
    context.fill();
  }
}

export { Wall };
