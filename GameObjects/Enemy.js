import { Moveable } from "./Moveable.js";

class Enemy extends Moveable {
  constructor(x, y, board, player) {
    super(x, y);
    this.board = board;
    this.player = player;
  }

  Tick() {
    this.stop();
    if (this.player.y < this.y && this.board[this.y - 1][this.x] != 1) {
      this.up();
    } else if (this.player.x > this.x && this.board[this.y][this.x + 1] != 1) {
      this.right();
    } else if (this.player.y > this.y && this.board[this.y + 1][this.x] != 1) {
      this.down()
    } else if (this.player.x < this.x && this.board[this.y][this.x - 1] != 1) {
      this.left()
    }

    super.Tick();
  }

  Render(context) {
    let width = this.width;
    let height = this.height;
    let center = new Object();
    center.x = this.x * width + 0.5 * width;
    center.y = this.y * height + 0.5 * height;
    context.beginPath();
    context.rect(
      center.x - 0.5 * width,
      center.y - 0.5 * height,
      width,
      height
    );
    context.fillStyle = "RED"; //color
    context.fill();
  }
}

export { Enemy };
