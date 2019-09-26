class Cannon {
    constructor(name, position, flip, ball, resolution) {
        this.name = name;
        this.image = null
        this.posX = position.x
        this.posY = position.y
        this.width = 70
        this.height = 70
        this.image = new Image();
        this.flip = false;
        this.ball = null;
        this.shootingPositionX = this.posX + 45;
        this.shootingPositionY = this.posY + 45;
        this.resolution = resolution
        this.shots = 0


        if (flip) {
            this.image.src = "img/cannon_2.png";
        } else {
            this.image.src = "img/cannon.png";
        }
    }

    update() {

    }

    shoot(speed, angle) {
        this.shots++;
        this.ball = new Ball("ball", this.shootingPositionX, this.shootingPositionY, this.resolution);
        this.ball.apply(speed, angle)
        this.ball.addCollideListener(() => {
            cannonGame.endGame();
        });
        cannonGame.addElement(this.ball)
    }

    draw(brush) {
        brush.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

}