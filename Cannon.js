class Cannon {
    constructor(name, position, flip, ball, resolution, isPlayerOne) {
        this.name = name;
        this.image = null
        this.posX = position.x
        this.posY = position.y
        this.width = 70
        this.height = 70
        this.image = new Image();
        this.flip = false;
        this.ball = null;
        this.isPlayerOne = isPlayerOne
        if (flip) {
            this.shootingPositionX = this.posX - 20;
        } else {
            this.shootingPositionX = this.posX + 90;
        }
        this.shootingPositionY = this.posY;
        this.resolution = resolution
        this.shots = 0
        if (flip) {
            this.image.src = "img/cannon_2.png";
        } else {
            this.image.src = "img/cannon.png";
        }
        this.flagImage1 = new Image();
        this.flagImage1.src = "img/flag.png";
        this.flagImage2 = new Image();
        this.flagImage2.src = "img/flag.png";
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
        console.log(cannonGame.playerOne)
        if (cannonGame.playerOne == this.isPlayerOne) {
            brush.drawImage(this.flagImage1,
                this.isPlayerOne ? this.posX - 10 : this.posX + 45, this.posY, 50, 50)
        }
        brush.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

}