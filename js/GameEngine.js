class GameEngine {
  constructor(screen) {
    this.screen = screen;
    this.brush = this.screen.getContext('2d');
    this.gameElements = [];
    this.colideElements = [];

    this.gravity = 800;
    this.wind = 0;

    this.fps = 0;
    this.timeLastFrame = new Date().getTime();

    this.scorePlayerOne = 0;
    this.scorePlayerTwo = 0;

    this.changeWind()
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(0);
  }

  changeWind() {
    this.wind = this.getRandomInt(-750, 750);
  }

  addElement(gameElement) {
    this.gameElements.push(gameElement);
  }

  addColideElement(gameElement) {
    this.colideElements.push(gameElement);
  }

  scorePlayer(playerOne) {
    if (playerOne) {
      this.scorePlayerOne++
    } else {
      this.scorePlayerTwo++
    }
  }

  findElement(name) {
    let result = null;
    this.gameElements.forEach(el => {
      if (el.name == name) result = el;
    });
    return result;
  }

  start() {
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  gameLoop() {
    this.checkColissions();
    this.render();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  checkColissions() {
    let ball = null
    if (ball = this.findElement('ball')) {
      if (ball.enabled) {
        this.colideElements.forEach(function (el) {
          if (((ball.positionX + ball.radius) > el.position.x) &&
            ((ball.positionX - ball.radius) < el.position.x + el.width) &&
            ((ball.positionY + ball.radius) > el.position.y) &&
            ((ball.positionY - ball.radius) < el.position.y + el.height)) {
            ball.onCollide(el)

          }
        })
      }
    }
  }

  render() {
    let timeFrame = new Date().getTime() - this.timeLastFrame;
    this.fps = 1000 / timeFrame;

    this.gameElements.forEach(element => {
      element.update(this.fps);
      element.draw(this.brush);
    });

    this.timeLastFrame = new Date().getTime();
    this.brush.fillStyle = '#000000';
    this.brush.font = '18px sans-serif';
    this.brush.fillText('Fps: ' + this.fps.toFixed(0), 20, 30);
    this.brush.fillText('Score: ' + this.scorePlayerOne + "  " + this.scorePlayerTwo, this.screen.width / 2, 30);
  }
}