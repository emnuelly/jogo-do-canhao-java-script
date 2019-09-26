class GameEngine {
    constructor(screen) {
        this.screen = screen
        this.brush = this.screen.getContext('2d')
        this.gameElements = []
        this.fps = 0;
        this.timeLastFrame = (new Date()).getTime();
    }

    start() {
        requestAnimationFrame(this.gameLoop.bind(this))
    }

    addElement(gameElement) {
        this.gameElements.push(gameElement);
    }

    findElement(name) {
        let result = null;
        this.gameElements.forEach((el) => {
            if (el.name == name) result = el;
        })
        return result;
    }

    gameLoop() {
        let timeFrame = (new Date()).getTime() - this.timeLastFrame;
        this.fps = 1000 / timeFrame;
        this.brush.beginPath();
        this.brush.clearRect(0, 0, this.screen.width, this.screen.height);
        this.brush.fill();
        this.gameElements.forEach((element) => {
            element.update(this.fps);
            element.draw(this.brush);
        });
        this.timeLastFrame = (new Date()).getTime();
        this.brush.fillStyle = "#000000";
        this.brush.font = '18px serif';
        this.brush.fillText('Fps: ' + this.fps.toFixed(0), 10, 20);
        requestAnimationFrame(this.gameLoop.bind(this))
    }
}