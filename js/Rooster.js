class Rooster {
  constructor(gameEngine) {
    this.gameEngine = gameEngine;
    this.roosterRight = new Image();
    this.roosterRight.src = 'img/roosterRight.png';
    this.roosterLeft = new Image();
    this.roosterLeft.src = 'img/roosterLeft.png';
    this.roosterInit = {
      x: resolution.width - 90,
      y: 10
    };
    this.roosterSize = {
      width: 70,
      height: 70
    };
  }

  update() {}

  draw(brush) {
    let image = this.roosterRight;
    if (this.gameEngine.wind < 0) {
      image = this.roosterLeft;
    }
    brush.drawImage(image, this.roosterInit.x, this.roosterInit.y, this.roosterSize.width, this.roosterSize.height);
    brush.fillStyle = 'teal';
    brush.font = '18px sans-serif';
    brush.fillText(this.gameEngine.wind, this.roosterInit.x + this.roosterSize.width / 3, this.roosterInit.y + this.roosterSize.height + 20);
  }
}
