class BallTrajectoryAi extends BallTrajectory {
    constructor(gameEngine, name, game, resolution) {

        super(gameEngine, name, game, resolution);
        // this.enabled = false;
        this.resolution = resolution

        this.targetCannon = gameEngine.findElement('cannonLeft');


    }

    getBallOfTheTime() {
        return this.gameEngine.findElement('ball');
    }


    setAngleAndSpeed(angle, speed) {
        this.angle = angle;
        this.speed = speed;
        return this.calcMap();
    }


    calcCoordMap() {
        this.setColor('blue');
        this.defineStartPoint();
        this.calcSpeedXnY();

        let coord = {
            x: this.startPoint.x,
            y: this.startPoint.y
        }
        let i = 0;
        while (i < this.speed) {

            coord.x = coord.x + (this.speedX / this.gameEngine.fps);
            coord.y = coord.y + (this.speedY / this.gameEngine.fps);
            this.coordMap.push({
                x: coord.x,
                y: coord.y
            });
            if ((coord.x >= 19) && (coord.x <= 111) && (coord.y >= 521) && (coord.y <= 613)) {
                return {
                    x: coord.x,
                    y: coord.y
                }
            }
            this.updateSpeed();
            i++;
        }
        return false;
    }

    calcMap() {
        this.setColor('blue');
        this.defineStartPoint();
        this.calcSpeedXnY();


        let coord = {
            x: this.startPoint.x,
            y: this.startPoint.y
        }
        let i = 0;
        while (i < this.speed) {

            coord.x = coord.x + (this.speedX / this.gameEngine.fps);
            coord.y = coord.y + (this.speedY / this.gameEngine.fps);
            this.coordMap.push({
                x: coord.x,
                y: coord.y
            });

            if (coord.y > this.startPoint.y + 45) {
                // console.log(coord)

                return {
                    hitCannon: false,
                    coord: coord
                }
            }
            let ball = this.getBallOfTheTime();
            // if ((coord.x >= 19) && (coord.x <= 100) && (coord.y >= 521) && (coord.y <= 613)) {
            if ((coord.x >= this.targetCannon.position.x - ball.radius) &&
                (coord.x <= this.targetCannon.position.x + this.targetCannon.width + ball.radius) &&
                (coord.y >= this.targetCannon.position.y - ball.radius) &&
                (coord.y <= this.targetCannon.position.y + this.targetCannon.height + ball.radius)) {


                return {
                    hitCannon: true,
                    coord: coord
                }

            }
            this.updateSpeed();
            i++;


        }
        return {
            hitCannon: false,
            coord: coord
        };
    }

    draw(brush) {

        function drawPoint(brush, x, y, radius) {
            brush.beginPath();
            brush.arc(x, y, radius, 0, 2 * Math.PI);
            brush.fill();
        }

        let radius = 2;
        brush.fillStyle = this.color;
        let self = this;
        this.coordMap.forEach(function (el, i) {
            // if (i > parseInt(self.speed / 27)) {
            if (i > parseInt(self.speed)) {
                return;
            }
            drawPoint(brush, el.x, el.y, radius);
        })
    }

}