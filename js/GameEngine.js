class GameEngine {
  constructor(screen) {
    this.gravity = 800;
    this.wind = 0;
    this.screen = screen;
    this.brush = this.screen.getContext('2d');
    this.gameElements = [];
    // static objects
    this.fps = 0;
    this.timeLastFrame = new Date().getTime();

    // this.changeWind()
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(0);
  }

  start() {
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  addElement(gameElement) {
    this.gameElements.push(gameElement);
  }

  findElement(name) {
    let result = null;
    this.gameElements.forEach(el => {
      if (el.name == name) result = el;
    });
    return result;
  }

  gameLoop() {
    this.checkColissions();
    this.render();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  changeWind() {
    this.wind = this.getRandomInt(-750, 750);
  }

  checkColissions() {
    // percorre todos os objetos
    // verifica se existe colissão entre os dois
    // chama o onCollide de ambos passando o objeto colidido
  }

  render() {
    let timeFrame = new Date().getTime() - this.timeLastFrame;
    this.fps = 1000 / timeFrame;
    this.brush.beginPath();
    this.brush.clearRect(0, 0, this.screen.width, this.screen.height);
    this.brush.fill();
    this.gameElements.forEach(element => {
      element.update(this.fps);
      element.draw(this.brush);
    });
    this.timeLastFrame = new Date().getTime();
    this.brush.fillStyle = '#000000';
    this.brush.font = '18px sans-serif';
    this.brush.fillText('Fps: ' + this.fps.toFixed(0), 20, 30);
  }
}
