import {Moveable} from "./Moveable.js";

class Enemy extends Moveable {
    constructor(x, y, walls, player, board, color = "red", enemy_list) {
        super(x, y, walls);
        this.board = board;
        this.player = player;
        this.color = color;
        this.animation = 1;
        this.enemy_list = enemy_list;
        this.random_factor = 3;
    }

    Tick() {
        let rand = Math.floor(Math.random() * this.random_factor);
        if (rand == 0 || rand == 1) {
            this.Stop();
            let path = this.BFS(this.x, this.y, this.player.x, this.player.y, this.board);
            let next_state = path[0];
            if (next_state != null) {
                if (this.x == next_state.x && this.y - 1 == next_state.y) {
                    this.Up();
                } else if (this.x + 1 == next_state.x && this.y == next_state.y) {
                    this.Right();
                } else if (this.x == next_state.x && this.y + 1 == next_state.y) {
                    this.Down()
                } else if (this.x - 1 == next_state.x && this.y == next_state.y) {
                    this.Left()
                }
            } else {
                console.log("pick");
            }
            let old_x = this.x;
            let old_y = this.y;
            super.Tick();

            let is_collide_with_enemy = false;
            this.enemy_list.forEach(enemy => {
                if (this != enemy && this.IsCollide(enemy)) {
                    is_collide_with_enemy = true;
                }
            });

            if (is_collide_with_enemy) {
                this.x = old_x;
                this.y = old_y;
            }
        }
    }

    BFS (object_x, object_y, goal_x, goal_y, board) {
        let closed_list = {};
        let queue = new Array();
        let start_state = new Object;
        let goal_state = new Object;
        start_state.x = object_x;
        start_state.y = object_y;
        goal_state.x = goal_x;
        goal_state.y = goal_y;
        let start_state_key = object_x.toString() + "," + object_y.toString(); //change var nme
    
        closed_list[start_state_key] = start_state;
        queue.push(start_state);
    
        while (queue.length != 0) {
            let current_state = queue.shift();
            if (current_state.x == goal_state.x && current_state.y == goal_state.y) {
                return this.getPathFromState(start_state, current_state);
            }
            let neighbors = this.generateAllNeighbors(current_state, board);
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor_key = neighbors[i].x.toString() + "," + neighbors[i].y.toString();
                if (!(neighbor_key in closed_list)) {
                    neighbors[i].predecessor = current_state;
                    closed_list[neighbor_key] = neighbors[i];
                    queue.push(neighbors[i]);
                }
            }
        }
        return new Array();
    }
    
    
    generateAllNeighbors(state, board) {
        let successors = new Array();
        if (state.x > 0 && board[state.y][state.x - 1] != 1){
            let up_state = new Object;
            up_state.x = state.x - 1;
            up_state.y = state.y;
            successors.push(up_state);
        }
        if(state.x < this.board[0].length - 1 && board[state.y][state.x + 1] != 1){
            let down_state = new Object;
            down_state.x = state.x + 1;
            down_state.y = state.y;
            successors.push(down_state);
        }
        if(state.y > 0 && board[state.y - 1][state.x] != 1){
            let left_state = new Object;
            left_state.x = state.x;
            left_state.y = state.y - 1;
            successors.push(left_state);
        }
        if(state.y < this.board.length - 1 && board[state.y + 1][state.x] != 1){
            let right_state = new Object;
            right_state.x = state.x;
            right_state.y = state.y + 1;
            successors.push(right_state);
        }
        return successors;
    }
    
    getPathFromState(start_state , goal_state) {
        let path = new Array();
        let current = goal_state;
        path.unshift(current);
        while (!(current.y == start_state.y && current.x == start_state.x)){
            path.unshift(current);
            current = current.predecessor;
        }
        return path;
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
