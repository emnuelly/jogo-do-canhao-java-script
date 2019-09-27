class Ball {
    constructor(name, startPosX, startPosY, resolution, enemyPosition) {
        this.name = name;
        this.positionX = startPosX;
        this.positionY = startPosY;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 800;
        this.radius = 11;
        this.enabled = false;
        this.resolution = resolution;
        this.enemyPosition = enemyPosition
    }

    update(fps) {
        if (this.enabled) {
            this.positionX += this.speedX / fps;
            this.speedY = this.speedY + this.gravity / fps
            this.positionY = this.positionY + this.speedY / fps;
        }


        if ((this.positionX >= this.enemyPosition.x && this.positionX <= this.enemyPosition.x + this.enemyPosition.size) &&
            (this.positionY >= this.enemyPosition.y && this.positionY <= this.enemyPosition.y + this.enemyPosition.size)) {
            alert('voce ganhou!')
            location.reload()
        }

        if (this.positionY >= resolution.height - 20) {
            this.speedX = 0;
            this.speedY = 0;
            this.enabled = false
        }
    }

    draw(brush) {
        brush.fillStyle = 'black';
        brush.beginPath();
        brush.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
        brush.fill();
    }

    apply(speed, angle) {
        this.enabled = true
        this.speedX = Math.cos(angle * Math.PI / 180) * speed;
        this.speedY = -Math.sin(angle * Math.PI / 180) * speed;
    }
}