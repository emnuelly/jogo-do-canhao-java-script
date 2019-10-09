class BallTrajectory {
  constructor(gameEngine, name, game, resolution) {
    this.name = name;
    this.game = game;
    this.gameEngine = gameEngine;

    this.resolution = resolution;
    this.coordMap = [];


    this.angle = null;
    this.speed = null;

    this.speedX = 0;
    this.speedY = 0;

    this.color = 'red';
  }

  defineStartPoint() {
    if (this.name == 'arc') {
      this.startPoint = this.gameEngine.findElement('cannonLeft').shootingPosition;
    } else {
      this.startPoint = this.gameEngine.findElement('cannonRight').shootingPosition;
    }
  }

  setAngleAndSpeed(angle, speed) {
    this.angle = angle;
    this.speed = speed;
    this.calcCoordMap();
  }

  calcSpeedXnY() {
    this.speedX = (-Math.cos((this.angle * Math.PI) / 180) * this.speed);
    this.speedY = (-Math.sin((this.angle * Math.PI) / 180) * this.speed);
  }

  updateSpeed() {
    this.speedX += this.gameEngine.wind / this.gameEngine.fps;
    this.speedY += this.gameEngine.gravity / this.gameEngine.fps;
  }

  calcCoordMap() {

    let enabled = false
    if (this.gameEngine.findElement('ball')) {
      enabled = this.gameEngine.findElement('ball').enabled
    }
    if (enabled) {
      this.setColor('transparent')
    } else {
      this.setColor('red')
    }


    // this.setColor('red');
    this.defineStartPoint();
    this.calcSpeedXnY();

    let coord = {
      x: this.startPoint.x,
      y: this.startPoint.y
    }
    let i = 0;
    while (i < this.speed / 27) {
      // while (i < this.speed) {

      coord.x = coord.x + (this.speedX / this.gameEngine.fps);
      coord.y = coord.y + (this.speedY / this.gameEngine.fps);
      this.coordMap.push({
        x: coord.x,
        y: coord.y
      });

      this.updateSpeed();
      i++;
    }

  }


  clearTrajectory() {
    this.coordMap = [];
  }

  setColor(color) {
    this.color = color;
  }

  update() {}

  draw(brush) {
    function drawPoint(brush, x, y, radius) {
      brush.beginPath();
      brush.arc(x, y, radius, 0, 2 * Math.PI);
      brush.fill();
    }

    let radius = 2;
    brush.fillStyle = this.color;
    this.coordMap.forEach(function (el, i) {
      drawPoint(brush, el.x, el.y, radius);
    })
    // this.clearTrajectory()
  }
}