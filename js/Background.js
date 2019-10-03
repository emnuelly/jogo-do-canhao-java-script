class Background {
  constructor(gameEngine, name, resolution) {
    this.gameEngine = gameEngine;
    this.name = name;
    this.posX = 0;
    this.posY = 0;
    this.width = resolution.width;
    this.height = resolution.height;
    this.clouds = [];
    this.cloudsImage = [];
    this.cloudNumber = 10;
    this.wind = gameEngine.wind;


    this.cloudsImage.push('img/cloud.png');
    this.cloudsImage.push('img/clouds.png');
    this.layer = 0;
    for (let i = 0; i < this.cloudNumber; i++) {
      let cloudImage = new Image();
      cloudImage.src = this.cloudsImage[Math.round(Math.random() * (this.cloudsImage.length - 1))];
      this.clouds.push({
        obj: cloudImage,
        x: Math.random() * screen.width,
        y: (Math.random() * screen.height) / 2,
        width: 80 + Math.random() * 150,
        height: 70 + Math.random() * 120,
        speed: this.generateRandWind()
      });
      if (i % 3 == 0) this.layer += 0.2;
    }
  }

  generateRandWind() {
    console.log('wind: ' + this.wind / 100, 'layer: ' + this.layer * 3)
    if (this.wind > 0) {
      return Math.abs(this.gameEngine.wind / 100 + this.layer * 3);
    }
    return -Math.abs(this.gameEngine.wind / 100 - this.layer * 3);

  }


  update() {
    this.clouds.forEach(el => {
      el.speed = this.generateRandWind();
      el.x += el.speed;

      if (el.x < -this.width && el.speed < 0) {
        el.x = this.width;
      } else if (el.x > this.width && el.speed > 0) {
        el.x = -this.width;
      }
    });
  }

  draw(brush) {
    brush.beginPath();
    brush.fillStyle = '#ededed';
    brush.fillRect(this.posX, this.posY, this.width, this.height);

    this.clouds.forEach(el => {
      brush.drawImage(el.obj, el.x, el.y, el.width, el.height);
    });
    brush.fill();
  }
}