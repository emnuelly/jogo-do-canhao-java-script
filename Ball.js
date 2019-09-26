class Ball {
    constructor(name, startPosX, startPosY, resolution) {
        this.name = name;
        this.positionX = startPosX;
        this.positionY = startPosY;
        this.speedX = 0
        this.speedY = 0
        this.gravity = 800
        this.radius = 11
        this.enabled = false
        this.onCollide = null
        this.resolution = resolution
    }

    addCollideListener(listener) {
        this.onCollide = listener;
    }

    update(fps) {
        this.positionX += this.speedX / fps;
        if (this.enabled) {
            this.speedY = this.speedY + this.gravity / fps
            this.positionY = this.positionY + this.speedY / fps;
        }
        if (this.positionY >= resolution.height - 20) {
            this.speedX = 0;
            this.speedY = 0;
            this.enabled = false
           this.onCollide.call();
        }
    }

    draw(brush) {
        brush.fillStyle = 'black';
        brush.beginPath();
        brush.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
        brush.fill();
    }

    // reset() {
    //     this.positionX = 105;
    //     this.positionY = 520;
    //     this.speedX = 0;
    //     this.speedY = 0;
    // }

    apply(speed, angle) {
        this.enabled = true
        this.speedX = Math.cos(angle * Math.PI / 180) * speed;
        this.speedY = -Math.sin(angle * Math.PI / 180) * speed;
    }
}