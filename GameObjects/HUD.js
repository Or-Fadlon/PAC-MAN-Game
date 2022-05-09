import {GameObject} from "./GameObject.js";

class HUD extends GameObject {
    constructor(canvas_height, canvas_width) {
        super(0, canvas_height);
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.hub_width = this.canvas_width * this.width;
        this.hub_height = 2 * this.height;
    }

    Render(context, score, life, time) {
        let hub_width = this.hub_width;
        let hub_height = this.hub_height;
        let center = new Object();
        center.x = this.x * this.width + 0.5 * hub_width;
        center.y = this.y * this.height + 0.5 * hub_height;
        context.beginPath();
        context.rect(center.x - 0.5 * hub_width, center.y - 0.5 * hub_height, hub_width, hub_height);
        context.fillStyle = "black"; //color
        context.fill();
        
        context.font = "30px Arial";
        context.fillStyle = "yellow"; //color
        context.textAlign = "start";
        context.fillText("Score: " + score, 15, center.y);
        context.textAlign = "center";
        let life_str = "❤";
        context.fillText(life_str.repeat(life), center.x, center.y);
        context.textAlign = "end";
        context.fillText("Time: " + time.toFixed(0), this.hub_width - 15, center.y);
    }
}

export {HUD};