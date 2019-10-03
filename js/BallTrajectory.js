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


  // stopTrajectoryX(x) {
  //   if (this.game.playerOne) {
  //     console.log(x, (-Math.cos((this.angle * Math.PI) / 180) * this.speed))
  //     return (x >= this.calcMidTrajectoryPoint((-Math.cos((this.angle * Math.PI) / 180) * this.speed)))
  //   }
  //   return (x <= this.calcMidTrajectoryPoint((-Math.cos((this.angle * Math.PI) / 180) * this.speed)))
  // }

  // calcMidTrajectoryPoint(speedX) {
  //   let time = this.speedY / this.gameEngine.gravity / 2;
  //   if (this.game.playerOne) {
  //     return this.startPoint.x + time * speedX
  //   }
  //   return this.startPoint.x - time * speedX;
  // }

  setAngleAndSpeed(angle, speed) {
    this.angle = angle;
    this.speed = speed;
  }

  calcSpeedXnY() {
    this.speedX = (-Math.cos((this.angle * Math.PI) / 180) * this.speed);
    this.speedY = (-Math.sin((this.angle * Math.PI) / 180) * this.speed);
  }

  updateSpeed() {
    // this.speedX += this.gameEngine.wind / this.gameEngine.fps;
    this.speedY += this.gameEngine.gravity / this.gameEngine.fps;
  }

  calcCoordMap() {
    this.setColor('red')
    this.defineStartPoint();
    this.calcSpeedXnY();

    let coord = {
      x: this.startPoint.x,
      y: this.startPoint.y
    }
    let i = 0;
    let boolean = null
    while (i < this.speed / 27) {
      // boolean = this.stopTrajectoryX(coord.x)

      coord.x = coord.x + (this.speedX / this.gameEngine.fps);
      coord.y = coord.y + (this.speedY / this.gameEngine.fps);
      // console.log("iteracao: " + i + " : " + coord.x, coord.y)
      this.coordMap.push({
        x: coord.x,
        y: coord.y
      });
      // console.log(speedX, speedY)

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
    this.coordMap.forEach(function (el) {
      drawPoint(brush, el.x, el.y, radius);
    })
    // this.clearTrajectory()
  }
}