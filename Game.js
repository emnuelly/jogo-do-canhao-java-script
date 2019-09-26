class Game {
    constructor(engine, controls) {
        this.gameEngine = engine
        this.controls = controls
        this.playerOne = true;

        this.controls.buttonShoot.addEventListener('click', (e) => {
            e.preventDefault();
            this.play();
        });

        // this.controls.buttonRestart.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     this.resetGame();
        // });
    }

    addElement(gameElement) {
        this.gameEngine.addElement(gameElement);
    }

    start() {
        this.gameEngine.start();
        this.controls.buttonShoot.style.display = 'block';
    }

    endGame() {
        this.controls.buttonShoot.style.display = 'block';
    }

    resetGame() {
        this.controls.buttonShoot.style.display = 'block';
        let ball = this.gameEngine.findElement("ball");
        ball.reset();
    }

    play() {
        // merece uma melhoria e receber como parametro
        let speed = document.getElementById('speed').value;
        let angle = document.getElementById('angle').value;

        if (angle < 0 || angle > 90) {
            alert("Digite um ângulo inválido!");
        } else if (speed < 0) {
            alert("Digite uma velocidade válida!");

        } else {
            if (this.playerOne) {
                myCannon1.shoot(speed, angle)
                this.playerOne = false;
            } else if (!this.playerOne) {
                myCannon2.shoot(-speed, -angle)
                this.playerOne = true;
            }

            this.controls.buttonShoot.style.display = 'none';
        }
    }
}