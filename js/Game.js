class Game {
    constructor(gameEngine) {
        this.gameEngine = gameEngine
        this.playerOne = true;
        this.controls = null;
    }

    setControls(controls) {
        this.controls = controls;
        controls.start(this);
    }

    addElement(gameElement) {
        this.gameEngine.addElement(gameElement);
    }

    start() {
        this.gameEngine.start();
    }

    endGame() {}

    resetGame() {}

    getGameEngine() {
        return this.gameEngine
    }
    play(speed, angle) {
        if (this.playerOne) {
            myCannon1.shoot(-speed, -angle)
            this.playerOne = false;

        } else if (!this.playerOne) {
            myCannon2.shoot(-speed, -angle)
            this.playerOne = true;

        }
        // this.gameEngine.changeWind()
    }
}