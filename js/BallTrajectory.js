class BallTrajectory {
  constructor(gameEngine, game, resolution) {
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
    if (this.game.playerOne) {
      this.startPoint = this.gameEngine.findElement('cannonLeft').shootingPosition
    } else {
      this.startPoint = this.gameEngine.findElement('cannonRight').shootingPosition
    }
  }

  setAngleAndSpeed(angle, speed) {
    this.angle = angle;
    this.speed = speed;
  }

  calcSpeedXnY() {
    // console.log("cos speed X " + -Math.cos((this.angle * Math.PI) / 180) * this.speed, "sen speed y " + (-Math.sin((this.angle * Math.PI) / 180) * this.speed))
    this.speedX = (-Math.cos((this.angle * Math.PI) / 180) * this.speed); // + this.gameEngine.wind;
    this.speedY = (-Math.sin((this.angle * Math.PI) / 180) * this.speed) + this.gameEngine.gravity / this.gameEngine.fps
  }

  calcCoordMap() {
    this.setColor('red')
    this.defineStartPoint();
    this.calcSpeedXnY();



    // console.log('x: ' + Math.round(this.speedX), 'y: ' + Math.round(this.speedY))


    let coord = {
      x: this.startPoint.x,
      y: this.startPoint.y
    }
    let i = 0;
    while (i < 10) {

      coord.x = coord.x + (this.speedX / this.gameEngine.fps);
      coord.y = coord.y + (this.speedY / this.gameEngine.fps);
      this.coordMap.push(coord);

      this.calcSpeedXnY();
      console.log(i, coord)

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

    let radius = 3;
    brush.fillStyle = this.color;
    this.coordMap.forEach(function (el) {
      drawPoint(brush, el.x, el.y, radius);
    })
    this.clearTrajectory()
  }
}