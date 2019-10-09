class Ai {
    constructor(gameEngine, cannon) {
        this.gameEngine = gameEngine;
        this.cannon = cannon;
        this.angle
        this.speed
        this.arc = null;
        this.perfectX
        this.speedX
        this.speedY
        this.resolution = {
            x: this.gameEngine.screen.width,
            y: this.gameEngine.screen.height
        }
    }

    start(game) {
        this.arc = new BallTrajectoryAi(this.gameEngine, 'arcAi', game, this.resolution);
        this.recalculateAngleAndSpeed()
        game.getGameEngine().addElement(this.arc);

    }


    waitShoot() {

        self = this;
        setTimeout(function () {
            self.shoot();

        }, 1000)
    }

    setAngleAndSpeed(angle, speed) {
        this.angle = angle;
        this.speed = speed;
    }


    recalculateAngleAndSpeed() {
        this.angle = this.getRandomInt(40, 100);
        this.speed = this.getRandomInt(500, 1000);
    }

    takeAim() {
        this.recalculateAngleAndSpeed();
        let hit = this.arc.setAngleAndSpeed(this.angle, this.speed)


        let i = 0
        while (i < 100) {
            this.recalculateAngleAndSpeed();

            if (hit.coord.x < 19) {
                this.setAngleAndSpeed(this.angle, this.speed - (this.speed / 2))
            } else if (hit.coord.x > 111) {
                this.setAngleAndSpeed(this.angle, this.speed + (this.speed / 2))

            }
            hit = this.arc.setAngleAndSpeed(this.angle, this.speed)

            if (hit.hitCannon) {
                break;
            } else if ((!hit.hitCannon) && (i < 99)) {
                this.arc.clearTrajectory()
            }
            i++;
        }

        this.waitShoot();

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(0);
    }

    shoot() {
        this.arc.setAngleAndSpeed(this.angle, this.speed);
        this.arc.setColor('blue')
        this.cannon.shoot(-this.speed, -this.angle);
        this.arc.clearTrajectory()

    }

    update() {


    }

    draw(brush) {}

}