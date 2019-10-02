class Cannon {
  constructor(gameEngine, name, position, isPlayerOne, resolution) {
    this.gameEngine = gameEngine;
    this.name = name;
    this.image = null;
    this.posX = position.x;
    this.posY = position.y;
    this.width = 70;
    this.height = 70;
    this.image = new Image();
    this.isPlayerOne = isPlayerOne;
    this.shootingPositionY = this.posY;
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
      this.shootingPositionX = this.posX + 75;
      this.image.src = 'img/cannon.png';
      this.enemyPosition.x = resolution.width - 90;
      this.enemyPosition.y = resolution.height - 95;
    } else {
      this.shootingPositionX = this.posX - 10;
      this.image.src = 'img/cannon_2.png';
      this.enemyPosition.x = 30;
      this.enemyPosition.y = resolution.height - 95;
    }
  }

  update() {}

  shoot(speed, angle) {
    let ball = new Ball(this.gameEngine, 'ball', this.shootingPositionX, this.shootingPositionY, this.resolution, this.enemyPosition);
    ball.apply(speed, angle);
    cannonGame.addElement(ball);
  }

  draw(brush) {
    let isMyTurn = cannonGame.playerOne == this.isPlayerOne;
    if (isMyTurn) {
      this.drawFlag(brush);
    }
    brush.drawImage(this.image, this.posX, this.posY, this.width, this.height);
  }

  drawFlag(brush) {
    brush.drawImage(this.flagImage1, this.isPlayerOne ? this.posX - 10 : this.posX + 45, this.posY, 50, 50);
  }
}
