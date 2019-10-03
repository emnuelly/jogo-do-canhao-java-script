class Ball {
  constructor(gameEngine, name, startPosX, startPosY, resolution, enemyPosition) {
    this.gameEngine = gameEngine;
    this.name = name;
    this.positionX = startPosX;
    this.positionY = startPosY;
    this.startingShootingPositionX = startPosX;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = this.gameEngine.gravity;
    this.wind = this.gameEngine.wind;
    this.radius = 11;
    this.enabled = false;
    this.resolution = resolution;
    this.enemyPosition = enemyPosition;
    this.posicaoXFinal = 0;
  }

  update(fps) {
    if (this.enabled) {
      this.speedY = this.speedY + this.gravity / fps;
      this.speedX = this.speedX + this.wind / fps;
      this.positionX += this.speedX / fps;
      this.positionY += this.speedY / fps;
    }

    // // colide conditions
    // if (this.positionX >= this.enemyPosition.x && this.positionX <= this.enemyPosition.x + this.enemyPosition.size && (this.positionY >= this.enemyPosition.y && this.positionY <= this.enemyPosition.y + this.enemyPosition.size)) {
    // confirm('Você ganhou!!!');
    //   location.reload();
    // }

    if (this.positionY >= resolution.height - 35) {
      this.speedX = 0;
      this.speedY = 0;
      this.enabled = false;
    }
  }

  draw(brush) {
    brush.fillStyle = 'black';
    brush.beginPath();
    brush.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
    brush.fill();
  }

  onCollide(object) {
    if (object.name == 'cannonRight' && (this.startingShootingPositionX < this.resolution.width / 2)) {
      // alert('esquerda ganha')
      this.gameEngine.scorePlayer(true);
      this.gameEngine.gameElements.pop()
      console.log('jogador esquerda ganhou')
    } else if (object.name == 'cannonLeft' && this.startingShootingPositionX > this.resolution.width / 2) {
      // alert('direita ganha')
      this.gameEngine.scorePlayer(false);
      this.gameEngine.gameElements.pop()
      console.log('jogador direita ganhou')
    } else if (object.name == 'floor') {
      console.log('chao')
    } else if (object.name == 'wall') {
      this.speedX = 0;
    }
  }

  apply(speed, angle) {
    this.enabled = true;
    this.speedX = Math.cos((angle * Math.PI) / 180) * speed;
    this.speedY = -Math.sin((angle * Math.PI) / 180) * speed;
  }
}