class Game {
    constructor(engine, controls) {
        this.gameEngine = engine
        this.controls = controls
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
        let ball = this.gameEngine.findElement("ball");
        ball.reset();
    }

    play(speed, angle) {
        // // merece uma melhoria e receber como parametro
        // let speed = document.getElementById('speed').value;
        // let angle = document.getElementById('angle').value;


        // if (angle < 0 || angle > 90) {
        // alert("Digite um ângulo inválido!");
        // } else if (speed < 0) {
        // alert("Digite uma velocidade válida!");

        // } else {
        if (this.playerOne) {
            myCannon1.shoot(-speed, -angle)
            this.playerOne = false;
        } else if (!this.playerOne) {
            myCannon2.shoot(-speed, -angle)
            this.playerOne = true;
        }

        // }
    }
}