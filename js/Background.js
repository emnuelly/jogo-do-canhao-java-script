class Background {
    constructor(name, resolution) {
        this.name = name;
        this.posX = 0
        this.posY = 0
        this.width = resolution.width;
        this.height = resolution.height;
        this.clouds = [];
        this.cloudsImage = []
        this.numeroNuvems = 50

        this.cloudsImage.push('img/cloud.png')
        this.cloudsImage.push('img/clouds.png')
        let layer = 0;
        for (let i = 0; i < this.numeroNuvems; i++) {
            let cloudImage = new Image();
            cloudImage.src = this.cloudsImage[Math.round((Math.random() * (this.cloudsImage.length - 1)))]
            this.clouds.push({
                obj: cloudImage,
                x: Math.random() * screen.width,
                y: Math.random() * screen.height / 2,
                width: 80 + Math.random() * 150,
                height: 70 + Math.random() * 120,
                speed: 0.2 + layer * 3
            })
            if (i % 3 == 0) layer += 0.2;
        }
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