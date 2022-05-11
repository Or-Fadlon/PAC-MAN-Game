class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
    }
}

export {GameObject};