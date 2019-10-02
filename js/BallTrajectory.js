class BallTrajectory {
  constructor() {
    this.angle = null;
    this.speed = null;
    this.speedX = 0;
    this.speedY = 0;
  }

  drawCurve(brush) {
    brush.beginPath();
    brush.lineWidth = 3;
    brush.strokeStyle = this.color;
    brush.moveTo(60, resolution.height - 95);
    brush.quadraticCurveTo(105 + this.calcImpactPointX() / 2, this.calcMaxHeight(), this.calcImpactPointX() + 105, resolution.height - 75);
    brush.stroke();
    console.log(this.calcMaxHeight());
  }

  calcImpactPointX() {
    this.speedY = -Math.sin((this.angle * Math.PI) / 180) * this.speed;
    this.speedX = Math.cos((this.angle * Math.PI) / 180) * this.speed;
    let deltaT = (2 * this.speedY) / this.gravity;
    return deltaT * this.speedX;
  }

  calcMaxHeight() {
    let tempoAlturaMaxima = this.speedY / this.gravity;
    let pontoAlturaMaxima = this.speedY * tempoAlturaMaxima + (this.gravity * Math.pow(tempoAlturaMaxima, 2)) / 2;

    console.log('Y max: ' + pontoAlturaMaxima);
    return this.resolution.height - 95 - pontoAlturaMaxima;
  }

  update() {}

  draw(brush) {
    brush.fillRect(this.calcImpactPointX() / 2 + 30, this.calcMaxHeight(), 30, 30);
    brush.fillRect(this.calcImpactPointX() + 105, this.resolution.height - 50, 30, 30);
  }
}
