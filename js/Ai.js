class Ai {
    constructor(gameEngine, cannon) {
        this.gameEngine = gameEngine;
        this.dificultyLevel = gameEngine.dificultyLevel.impossible;
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

    setAimAcordinToDificultyLevel(value) {
        switch (this.dificultyLevel) {
            case 0:
                //easy
                return value * this.getRandom(0.7, 1.3)
            case 1:
                //medium
                return value * this.getRandom(0.8, 1.2)
            case 2:
                //hard
                return value * this.getRandom(0.9, 1.1)
            case 3:
                //insane
                return value * this.getRandom(0.98, 1.02);
            case 4:
                //impossibru
                return value;
        }
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
        while (i < 50) {
            this.arc.clearTrajectory()
            console.log(hit.hitCannon)
            if (hit.coord.x < 19) {
                hit = this.setAngleAndSpeed(this.angle, this.speed * 0.9)
            } else if (hit.coord.x > 80) {
                hit = this.setAngleAndSpeed(this.angle, this.speed * 1.1)
            }
            hit = this.arc.setAngleAndSpeed(this.angle, this.speed)

            if (hit.hitCannon) {
                this.angle = this.setAimAcordinToDificultyLevel(this.angle);
                this.arc.clearTrajectory()
                hit = this.arc.setAngleAndSpeed(this.angle, this.speed)
                return this.waitShoot();
            } else if (i == 49) {
                i = 0;
                this.recalculateAngleAndSpeed();
                console.log('chegou no i 49')
            }
            i++;
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(0);
    }

    getRandom(min, max) {
        return (Math.random() * (max - min) + min);
    }

    shoot() {
        this.cannon.shoot(-this.speed, -this.angle);
        this.arc.clearTrajectory()
    }

    update() {}

    draw(brush) {}

}