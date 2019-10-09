class Ball {
  constructor(gameEngine, name, startPosX, startPosY, resolution, enemyPosition, ballOwner) {
    this.ballOwner = ballOwner;
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

    if (this.positionY >= resolution.height) {
      // this.resetAfterCollide()
      if (this.ballOwner == 'cannonLeft') {
        self = this;
        this.enabled = false;

        this.ballOwner = this.gameEngine.findElement('ball').ballOwner

        this.gameEngine.gameElements.pop()
        // setTimeout(function () {
        //   self.gameEngine.getAi().shoot();
        // }, 500)
        this.gameEngine.getAi().takeAim();


      }
      this.speedX = 0;
      this.speedY = 0;
      this.enabled = false;
    }
  }

  resetAfterCollide() {
    if (this.ballOwner == 'cannonLeft') {
      this.enabled = true
      this.gameEngine.getAi().takeAim();
    }
    this.speedX = 0;
    this.speedY = 0;
    this.enabled = false;


  }

  draw(brush) {
    brush.fillStyle = 'black';
    brush.beginPath();
    brush.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
    brush.fill();
  }

  onCollide(object) {
    if (object.name == 'cannonRight' && this.ballOwner == 'cannonLeft') {
      this.gameEngine.scorePlayer(true);
      this.gameEngine.gameElements.pop()
      this.resetAfterCollide()
      console.log('jogador esquerda ganhou')
    } else if (object.name == 'cannonLeft' && this.ballOwner == 'cannonRight') {
      this.gameEngine.scorePlayer(false);
      this.resetAfterCollide();
      this.gameEngine.gameElements.pop()
      this.enabled = false;
      console.log('jogador direita ganhou')
    } else if (object.name == 'floor') {
      // console.log(this.positionY)
      this.resetAfterCollide();
    } else if (object.name == 'wall') {
      if ((this.positionY + this.radius >= object.position.y) && (this.positionY + this.radius <= object.position.y + this.radius)) {
        this.speedY = -this.speedY;
      } else {
        this.speedX = -this.speedX;
      }
    }
  }

  apply(speed, angle) {
    this.enabled = true;
    this.speedX = Math.cos((angle * Math.PI) / 180) * speed;
    this.speedY = -Math.sin((angle * Math.PI) / 180) * speed;
  }
}