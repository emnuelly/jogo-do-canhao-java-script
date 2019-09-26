class Background {
    constructor(name, resolution) {
        this.name = name;
        this.posX = 0
        this.posY = 0
        this.width = resolution.width;
        this.height = resolution.height;
        this.clouds = [];
        this.clouds.push({
            x: 800,
            y: 35,
            width: 280,
            height: 60,
            speed: 1,
        })
        this.clouds.push({
            x: 2400,
            y: 60,
            width: 180,
            height: 30,
            speed: 2
        })

    }

    update() {
        this.clouds.forEach((el) => {
            el.x -= el.speed;
            if (el.x < -el.width * 2) {
                el.x = 2000;
            }
        })
    }

    draw(brush) {
        brush.beginPath()
        brush.fillStyle = '#ededed'
        brush.fillRect(this.posX, this.posY, this.width, this.height)
        brush.fillStyle = '#ff0000';
        this.clouds.forEach((el) => {
            brush.fillRect(el.x, el.y, el.width, el.height);
        });
        brush.fill();
    }
}