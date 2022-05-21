import {GameObject} from "./GameObject.js";

class GamePopUp extends GameObject {
    constructor(message) {
        super(0, 11);
        this.message = message;

        this.pop_width = 23 * this.width;
        this.pop_height = 2 * this.height;
    }

    Render(context) {
        let canvas_width = 23 * this.width;
        let canvas_height = 23 * this.height;

        let rectangle_width = this.pop_width;
        let rectangle_height = this.pop_height;
        let center = {};
        center.x = canvas_width / 2 - rectangle_width / 2;
        center.y = canvas_height / 2 - rectangle_height / 2;
        context.beginPath();
        context.rect(center.x, center.y, rectangle_width, rectangle_height);
        context.fillStyle = "red"; //color
        context.fill();

        rectangle_width = this.pop_width - 10;
        rectangle_height = this.pop_height - 10;
        center = {};
        center.x = canvas_width / 2 - rectangle_width / 2;
        center.y = canvas_height / 2 - rectangle_height / 2;
        context.beginPath();
        context.rect(center.x, center.y, rectangle_width, rectangle_height);
        context.fillStyle = "white"; //color
        context.fill();

        context.font = "30px 'Merienda One'";
        context.fillStyle = "blue"; //color
        context.textAlign = "left";
        let text_size = context.measureText(this.message);
        context.fillText(this.message, (canvas_width / 2) - (text_size.width / 2), (canvas_height / 2) + 10);
    }
}

export {GamePopUp};