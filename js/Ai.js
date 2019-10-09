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
        let y = hit.coord.y


        let i = 0
        while (i < 50) {
            this.arc.clearTrajectory()

            if (hit.coord.x < 19) {
                hit = this.setAngleAndSpeed(this.angle, this.speed * 0.9)

            } else if (hit.coord.x > 80) {
                hit = this.setAngleAndSpeed(this.angle, this.speed * 1.1)

            }
            hit = this.arc.setAngleAndSpeed(this.angle, this.speed)

            console.log(i, y)
            if (hit.hitCannon) {
                console.log('achou', i, this.angle)
                // break;
                return this.waitShoot();
            } else if (i < 48) {} else if (i == 49) {
                console.log('nao acertou, angulo ' + this.angle)
                console.log(hit.coord)
                i = 0;
                this.recalculateAngleAndSpeed();

            }
            i++;
        }





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