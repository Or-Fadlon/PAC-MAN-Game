class GameObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  Tick() {

  }

  Render() {

  }

  present() {
    return 'I have a ' + this.carname;
  }
}

export { GameObject };