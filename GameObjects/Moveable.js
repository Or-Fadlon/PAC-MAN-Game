import { GameObject } from "./GameObject.js";

class Moveable extends GameObject {
  constructor(x, y, board) {
    super(x, y);
    this.board = board;
    this.velocity_x = 0;
    this.velocity_y = 0;
  }

  Tick() {
    if (this.velocity_x != 0 && this.board[this.y][this.x + this.velocity_x] == 0) {
      this.x = this.x + this.velocity_x;
    }
    if (this.velocity_y != 0 && this.board[this.y + this.velocity_y][this.x] == 0) {
      this.y = this.y + this.velocity_y;
    }
  }
}

export { Moveable };
