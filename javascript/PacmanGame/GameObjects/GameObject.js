class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.prev_x = x;
        this.prev_y = y;
        this.width = 30;
        this.height = 30;
    }

    Tick() {

    }

    Render(context) {

    }

    IsCollide (other) {
        return !(
        (other.x > this.x + 0.95) ||
        (other.x + 0.95 < this.x) ||
        (other.y > this.y + 0.95) ||
        (other.y + 0.95 < this.y)
        ) 
        || 
        (other.prev_x == this.x && other.x == this.prev_x && other.prev_y == this.y && other.y == this.prev_y)
    }
}

export {GameObject};