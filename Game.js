class Game {
    constructor(engine, controls) {
        this.gameEngine = engine
        this.controls = controls

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
        // this.controls.buttonRestart.style.display = "none";
    }

    endGame() {
        this.controls.buttonShoot.style.display = 'block';
        // this.controls.buttonRestart.style.display = "block";
    }

    resetGame() {
        this.controls.buttonShoot.style.display = 'block';
        // this.controls.buttonRestart.style.display = "none";
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
            //let ball = this.gameEngine.findElement("ball");
            //ball.apply(speed, angle);
            myCannon1.shoot(speed, angle)
            this.controls.buttonShoot.style.display = 'none';
        }
    }
}