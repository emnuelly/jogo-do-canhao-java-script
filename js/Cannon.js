class Cannon {
  constructor(gameEngine, name, position, isPlayerOne, resolution) {
    this.gameEngine = gameEngine;
    this.name = name;
    this.image = null;

    this.position = position;

    this.width = 70;
    this.height = 70;

    this.image = new Image();
    this.isPlayerOne = isPlayerOne;
    this.shootingPosition = {
      x: null,
      y: null
    }
    this.shootingPosition.y = this.position.y;
    this.resolution = resolution;

    this.flagImage1 = new Image();
    this.flagImage1.src = 'img/flag.png';
    this.flagImage2 = new Image();
    this.flagImage2.src = 'img/flag.png';

    this.enemyPosition = {
      x: 0,
      y: 0,
      size: 70
    };

    if (isPlayerOne) {
      this.shootingPosition.x = this.position.x + 75;
      this.image.src = 'img/cannonLeft.png';
      this.enemyPosition.x = resolution.width - 90;
      this.enemyPosition.y = resolution.height - 95;
    } else {
      this.shootingPosition.x = this.position.x - 10;
      this.image.src = 'img/cannonRight.png';
      this.enemyPosition.x = 30;
      this.enemyPosition.y = resolution.height - 95;
    }
  }

  update() {}

  shoot(speed, angle) {
    let ball = new Ball(this.gameEngine, 'ball', this.shootingPosition.x, this.shootingPosition.y, this.resolution, this.enemyPosition);
    ball.apply(speed, angle);
    cannonGame.addElement(ball);
  }

  drawFlag(brush) {
    brush.drawImage(this.flagImage1, this.isPlayerOne ? this.position.x - 10 : this.position.x + 45, this.position.y, 50, 50);
  }

  draw(brush) {
    let isMyTurn = cannonGame.playerOne == this.isPlayerOne;
    if (isMyTurn) {
      this.drawFlag(brush);
    }
    brush.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
}