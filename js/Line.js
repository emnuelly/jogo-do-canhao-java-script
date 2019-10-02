class Line {
  constructor(gameEngine, resolution) {
    this.gameEngine = gameEngine;
    this.resolution = resolution;
    this.gravity = this.gameEngine.gravity;
    this.initCoord = {
      x: 0,
      y: 0
    };

    this.actualCoord = {
      x: 0,
      y: 0
    };
    this.color = 'gray';
  }

  setColor(color) {
    this.color = color;
  }

  setInitCoord(initCoord) {
    this.initCoord = initCoord;
  }

  setActualCoord(actualCoord) {
    this.actualCoord = actualCoord;
  }

  drawLine(brush) {
    brush.beginPath();
    brush.lineWidth = 5;
    brush.strokeStyle = this.color;
    brush.setLineDash([5, 20]);
    brush.moveTo(this.initCoord.x, this.initCoord.y);
    brush.lineTo(this.actualCoord.x, this.actualCoord.y);
    brush.stroke();
  }

  update() {}

  draw(brush) {
    this.drawLine(brush);
  }
}
