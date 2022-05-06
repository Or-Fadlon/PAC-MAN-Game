import { Moveable } from "./Moveable.js";

class Player extends Moveable {
  constructor(x, y, board) {
    super(x, y, board);
    this.diraction = "right";
    this.pacMouthCheck = true;
    this.pacMouth = 0;
  }

  Render(context) {
    let width = this.width;
    let height = this.height;
    let center = new Object();
    center.x = this.x * width + 0.5 * width;
    center.y = this.y * height + 0.5 * height;
    context.beginPath();
    if (this.diraction == "up"){
      context.arc(center.x, center.y, width*0.5, 1.65 * Math.PI + this.pacMouth , 1.35 * Math.PI - this.pacMouth); // half circle
    } else if (this.diraction == "down"){
      context.arc(center.x, center.y, width*0.5, 0.65 * Math.PI + this.pacMouth, 0.35 * Math.PI - this.pacMouth); // half circle
    } else if (this.diraction == "left"){
      context.arc(center.x, center.y, width*0.5, 1.15 * Math.PI + this.pacMouth , 0.85 * Math.PI - this.pacMouth); // half circle
    } else if (this.diraction == "right"){
      context.arc(center.x, center.y, width*0.5, 0.15 * Math.PI + this.pacMouth , 1.85 * Math.PI - this.pacMouth); // half circle
    }
    context.lineTo(center.x, center.y);
    context.fillStyle = "yellow"; //color
    context.fill();
    context.beginPath();
    if (this.diraction == "up"){
      context.arc(center.x + width*0.25, center.y - width*0.083, width*0.083, 0, 2 * Math.PI); // circle
    } else if (this.diraction == "down"){
      context.arc(center.x + width*0.25, center.y - width*0.083, width*0.083, 0, 2 * Math.PI); // circle
    } else if (this.diraction == "left"){
      context.arc(center.x + width*0.083, center.y - width*0.25, width*0.083, 0, 2 * Math.PI); // circle
    } else if (this.diraction == "right"){
      context.arc(center.x + width*0.083, center.y - width*0.25, width*0.083, 0, 2 * Math.PI); // circle
    }
    context.fillStyle = "black"; //color
    context.fill();

      if (this.pacMouthCheck){
        this.pacMouthCheck = false;
        this.pacMouth = 0.20;
      } else {
        this.pacMouthCheck = true;
        this.pacMouth = 0;
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

export { Player };
