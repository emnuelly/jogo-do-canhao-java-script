class Floor {
  constructor(name, resolution) {
    this.name = name;
    this.posX = 0;
    this.posY = resolution.height - 50;
    this.width = resolution.width;
    this.height = 50;
  }

  update() {}

  draw(brush) {
    brush.beginPath();
    brush.fillStyle = '#1aab00';
    brush.fillRect(this.posX, this.posY, this.width, this.height);
    brush.fill();
  }
}
