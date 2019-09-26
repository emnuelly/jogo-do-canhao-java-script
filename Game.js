class Game {
    constructor(engine) {
        this.gameEngine = engine
        this.playerOne = true;

    }

    addElement(gameElement) {
        this.gameEngine.addElement(gameElement);
    }

    start() {
        this.gameEngine.start();
    }

    endGame() {
    }

    resetGame() {
    }

    play(speed, angle) {
        if (this.playerOne) {
            myCannon1.shoot(-speed, -angle)
            this.playerOne = false;
            
        } else if (!this.playerOne) {
            myCannon2.shoot(-speed, -angle)
            this.playerOne = true;

        }
    }
}