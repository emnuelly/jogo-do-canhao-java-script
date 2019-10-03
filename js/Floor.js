class Floor {
  constructor(name, resolution) {
    this.name = name;
    this.position = {
      x: 0,
      y: resolution.height - 50
    }
    this.width = resolution.width;
    this.height = 50;
  }

  update() {}

  draw(brush) {
    brush.beginPath();
    brush.fillStyle = '#1aab00';
    brush.fillRect(this.position.x, this.position.y, this.width, this.height);
    brush.fill();
  }
}