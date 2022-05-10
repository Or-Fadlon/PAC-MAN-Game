import {Moveable} from "./Moveable.js";

class Enemy extends Moveable {
    constructor(x, y, board, player, color = "red") {
        super(x, y);
        this.board = board;
        this.player = player;
        this.color = color;
        this.animation = 1;
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

    Render (context) {
        let s = this.height;
        let top  = this.y * this.height;
        let left = this.x * this.width;
    
        // if (eatable && secondsAgo(eatable) > 8) {
        //     eatable = null;
        // }
        
        // if (eaten && secondsAgo(eaten) > 3) { 
        //     eaten = null;
        // }
        
        let tl = left + s;
        let base = top + s - 3;
        let inc = s / 10;

        let high =  3 * this.animation;
        let low  = -3 * this.animation;
        this.animation = -this.animation;

        context.fillStyle = this.color;
        context.beginPath();

        context.moveTo(left, base);

        context.quadraticCurveTo(left, top, left + (s/2),  top);
        context.quadraticCurveTo(left + s, top, left+s,  base);
        
        // Wavy things at the bottom
        context.quadraticCurveTo(tl-(inc*1), base+high, tl - (inc * 2),  base);
        context.quadraticCurveTo(tl-(inc*3), base+low, tl - (inc * 4),  base);
        context.quadraticCurveTo(tl-(inc*5), base+high, tl - (inc * 6),  base);
        context.quadraticCurveTo(tl-(inc*7), base+low, tl - (inc * 8),  base); 
        context.quadraticCurveTo(tl-(inc*9), base+high, tl - (inc * 10), base); 

        context.closePath();
        context.fill();

        context.beginPath();
        context.fillStyle = "white";
        context.arc(left + 10,top + 12, s / 6, 0, 300, false);
        context.arc((left + s) - 10,top + 12, s / 6, 0, 300, false);
        context.closePath();
        context.fill();

        let f = s / 12;
        let off = {
            right: [f, 0],
            left: [-f, 0],
            up: [0, -f],
            down: [0, f],
        };

        context.beginPath();
        context.fillStyle = "#0048FF";
        context.arc(left+10+off[this.diraction][0], top+12+off[this.diraction][1], s / 15, 0, 300, false);
        context.arc((left+s)-10+off[this.diraction][0], top+12+off[this.diraction][1], s / 15, 0, 300, false);
        context.closePath();
        context.fill();

    };
}

export {Enemy};
