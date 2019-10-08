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
        // this.arc = new BallTrajectory(this.gameEngine, 'arcAi', game, this.resolution);
    }

    // IDEIAS PARA UM FUTURO MELHOR, OU TAMBEM CONHECIDO COMO BRAINSTORM:
    // settar um angulo semi-aleatorio e varrer para achar o tiro certo





    // getImpactPointX(speed, angle) {
    //     let speedX = Math.cos((angle * Math.PI) / 180) * speed;
    //     let speedY = -Math.sin((angle * Math.PI) / 180) * speed;
    //     let airTime = speedY / (this.gameEngine.gravity / this.gameEngine.fps);
    //     let impactPointX = airTime * 2 * (speedX + this.gameEngine.wind / this.gameEngine.fps);

    //     console.log(impactPointX)
    //     return impactPointX;
    // }

    // scanForX(angle) {
    //     let speed = 500;
    //     let impactX = this.getImpactPointX(speed, angle);

    //     while (impactX >= 19 || impactX <= 111) {
    //         impactX = this.getImpactPointX(speed, angle);
    //         speed++
    //     }
    //     return speed;
    // }


    // findPerfectShot(speed, x, y) {
    //     if ((x >= 19) && (x <= 111) && (y >= 521) && (y <= 613)) {
    //         return speed
    //     }
    //     if ((x < 0) || (y > 650)) {
    //         return speed / 2
    //     }
    //     this.speedX = -Math.cos((this.angle * Math.PI) / 180) * speed + this.gameEngine.wind
    //     this.speedY = -Math.sin((this.angle * Math.PI) / 180) * speed + this.gameEngine.gravity
    //     console.log(speed)


    //     this.findPerfectShot(speed, x + this.speedX, y + this.speedY)
    //     return "nao achou"
    //     // this.findPerfectShot(speed * 2, x + this.speedX, y + this.speedY)
    // }

    start(game) {
        this.arc = new BallTrajectory(this.gameEngine, 'arcAi', game, this.resolution);
        this.recalculateAngleAndSpeed()
        game.getGameEngine().addElement(this.arc);

    }


    waitShoot() {
        self = this;
        setTimeout(function () {
            self.shoot();
        }, 500)
    }


    recalculateAngleAndSpeed() {
        this.angle = this.getRandomInt(30, 70);
        this.speed = this.getRandomInt(500, 1000);
    }

    takeAim() {

        // console.log(this.gameEngine.findElement('ball').enabled)
        this.recalculateAngleAndSpeed();
        this.arc.setAngleAndSpeed(this.angle, this.speed)



        // let angulo = -45;
        // let speed = -500

        // let speed = this.scanForX(angulo);
        // console.log('AI shoot:', speed, angulo);
        // this.arc.clearTrajectory();
        // this.arc.setAngleAndSpeed(this.angle, this.speed)
        this.waitShoot();

        // console.log(this.findPerfectShot(speed, 919, 532))
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(0);
    }

    shoot() {
        this.arc.setAngleAndSpeed(this.angle, this.speed);
        this.arc.setColor('red')
        this.cannon.shoot(-this.speed, -this.angle);
        this.arc.clearTrajectory()

    }

    update() {
        // this.arc.clearTrajectory()
        // this.arc.setAngleAndSpeed(this.angle, this.speed);



    }

    draw(brush) {

        // function drawPoint(brush, x, y, radius) {
        //     brush.beginPath();
        //     brush.arc(x, y, radius, 0, 2 * Math.PI);
        //     brush.fill();
        // }

        // let radius = 2;
        // brush.fillStyle = 'red'
        // this.arc.coordMap.forEach(function (el) {
        //     drawPoint(brush, el.x, el.y, radius);
        // })

    }

}