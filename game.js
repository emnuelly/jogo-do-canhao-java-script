class Game {
    
    constructor(engine, controls) {
        this.gameEngine = engine
        this.controls = controls

        this.controls.buttonShoot.addEventListener('click', (e) => {
            e.preventDefault();
            this.play();
        });

        this.controls.buttonRestart.addEventListener('click', (e) => {
            e.preventDefault();
            this.resetGame();
        });
    }

    addElement(gameElement) {
        this.gameEngine.addElement(gameElement);
    }

    start() {
        this.gameEngine.start();
        this.controls.buttonShoot.style.display = 'block';
        this.controls.buttonRestart.style.display = "none";
    }

    endGame() {
        this.controls.buttonShoot.style.display = 'none';
        this.controls.buttonRestart.style.display = "block";
    }

    resetGame() {
        this.controls.buttonShoot.style.display = 'block';
        this.controls.buttonRestart.style.display = "none";
        let ball = this.gameEngine.findElement("ball");
        ball.reset();
    }

    play() {
        // merece uma melhoria e receber como parametro
        let speed = document.getElementById('speed').value;
        let angle = document.getElementById('angle').value;
    
        if (angle < 0 || angle > 90) {
            alert("Digite um ângulo inválido!");
        }else if(speed < 0){
            alert("Digite uma velocidade válida!");
    
        } else {
            let ball = this.gameEngine.findElement("ball");
            ball.apply(speed, angle);
            this.controls.buttonShoot.style.display = 'none';
        }
    }
}

class GameEngine{
    constructor(screen){
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
            if(el.name == name) result = el;
        })
        return result;
    }

    gameLoop() {
       let timeFrame = (new Date()).getTime() - this.timeLastFrame;
       this.fps = 1000 / timeFrame;
       this.brush.beginPath();
       this.brush.clearRect(0,0, this.screen.width, this.screen.height);
       this.brush.fill();
       this.gameElements.forEach((element) => {
            element.update(this.fps);
            element.draw(this.brush);
       });
       this.timeLastFrame = (new Date()).getTime();
       this.brush.fillStyle = "#000000";
       this.brush.font = '18px serif';
       this.brush.fillText('Fps: '+this.fps.toFixed(0), 10, 20);
       requestAnimationFrame(this.gameLoop.bind(this))
    }
}

class Ball{
    constructor(name){
        this.name = name;
        this.positionX = 105
        this.positionY = 520
        this.speedX = 0
        this.speedY = 0
        this.gravity = 800
        this.radius = 11
        this.enabled = false
        this.onCollide = null;
    }

    addCollideListener(listener) {
        this.onCollide = listener;
    }

    update(fps) {
        this.positionX += this.speedX / fps;
        if(this.enabled) {
            this.speedY = this.speedY + this.gravity / fps
            this.positionY = this.positionY + this.speedY / fps;
        }
        if (this.positionY >= 580- 20)  {
            this.speedX = 0;
            this.speedY = 0;
            this.enabled = false
            this.onCollide.call();
        }
    }

    draw(brush) {
        brush.fillStyle = 'black';
        brush.beginPath();
        brush.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
        brush.fill();
    }

    reset() {
       
        this.positionX= 105;
        this.positionY= 520;
        this.speedX= 0;
        this.speedY= 0;
           
    }

    apply(speed, angle) {
        this.enabled = true
        this.speedX = Math.cos(angle * Math.PI / 180) * speed;
        this.speedY = - Math.sin(angle * Math.PI / 180) * speed;
    }
}

class Cannon{
    constructor(name, position){
        this.name = name;
        this.image = null
        this.posX = position.x
        this.posY = position.y
        this.width = 70
        this.height = 70
        this.image = new Image();
        this.image.src = "img/cannon.png";
    }
    update() {

    }
    draw(brush) {
        brush.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

}

class Floor {
    constructor(name){
        this.name = name;
        this.posX = 0
        this.posY = 550
        this.width =  1000
        this.height = 50
    }
    update() {

    }
    draw(brush) {
        brush.beginPath();
        brush.fillStyle = '#1aab00';
        brush.fillRect(this.posX, this.posY, this.width, this.height);
        brush.fill();
    }
    
}

class Background{
    constructor(name){
        this.name = name;
        this.posX = 0 
        this.posY = 0
        this.width = 1000
        this.height = 600
        this.clouds = [];

        this.clouds.push({
            x: 2000,
            y: 35,
            width:280,
            height:60,
            speed: 1,
        })

        this.clouds.push({
            x: 2400,
            y: 60,
            width:180,
            height:30,
            speed:2
        })

    }
    update() {
        this.clouds.forEach((el) => {
            el.x -= el.speed;
            if(el.x < - el.width * 2) {
                el.x = 2000;
            } 
        })
    }
    draw(brush) {
        brush.beginPath()
        brush.fillStyle = '#ededed'
        brush.fillRect(this.posX, this.posY, this.width, this.height)
        brush.fillStyle = '#ff0000';
        this.clouds.forEach((el) => {
            brush.fillRect(el.x, el.y, el.width, el.height);
        });
        brush.fill();
        brush.fill()
    }
}

// aqui é onde o jogo roda mesmo

let myControls = {
    buttonShoot: document.getElementById('shoot'),
    buttonRestart: document.getElementById('restart')
};

let screen = document.querySelector("canvas")

let myEngine = new GameEngine(screen)

// adiciona todos os elementos
let myCannon = new Cannon("cannon",{x: 30, y: 520});
let ball2 = new Ball("ball");
let myFloor = new Floor("floor");
let myBackground = new Background("background");

let cannonGame = new Game(myEngine, myControls)


ball2.addCollideListener(() => {
    cannonGame.endGame();
});

cannonGame.addElement(myBackground);
cannonGame.addElement(myFloor);
cannonGame.addElement(ball2);
cannonGame.addElement(myCannon);

cannonGame.start();