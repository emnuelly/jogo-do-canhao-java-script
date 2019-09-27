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
        this.cloudsImage = []
        this.cloudsImage.push('img/cloud.png')
        this.cloudsImage.push('img/clouds.png')
        this.numeroNuvems = 6

        for (let i = 0; i < this.numeroNuvems; i++) {
            this.clouds.push({
                image: this.cloudsImage[Math.round((Math.random() * (this.cloudsImage.length - 1)))],
                x: Math.random() * screen.width,
                y: Math.random() * screen.height / 2,
                width: 80 + Math.random() * 150,
                height: 70 + Math.random() * 120,
                speed: 0.2 + Math.random() * 3
            })
        }


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

        // brush.beginPath()
        // brush.moveTo(initCoord.x, initCoord.y)
        // brush.strokeStyle = '#ff0000'
        // brush.lineTo(finalCoord.x, finalCoord.y)
        // brush.lineWidth = 25;
        // brush.stroke()
    }
}