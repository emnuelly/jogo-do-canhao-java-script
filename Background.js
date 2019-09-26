class Background {
    constructor(name, resolution) {
        this.name = name;
        this.posX = 0
        this.posY = 0
        this.width = resolution.width;
        this.height = resolution.height;
        this.clouds = [];
        this.image = null;
        this.image = new Image();
        this.clouds.push({
            image: "img/cloud.png",
            x: 800,
            y: 35,
            width: 150,
            height: 80,
            speed: 2
        })
        this.clouds.push({
            image: "img/clouds.png",
            x: 1000,
            y: 70,
            width: 150,
            height: 80,
            speed: 1
        })
        this.clouds.push({
            image: "img/cloud.png",
            x: 1200,
            y: 90,
            width: 150,
            height: 80,
            speed: 1.5
        })
        this.clouds.push({
            image: "img/clouds.png",
            x: 1200,
            y: 110,
            width: 150,
            height: 80,
            speed: 0.5
        })

        this.clouds.forEach(e => {
            e.obj = new Image();
            e.obj.src = e.image
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

        this.clouds.forEach((el) => {
            brush.drawImage(el.obj, el.x, el.y, el.width, el.height);
        });
        brush.fill();
    }
}