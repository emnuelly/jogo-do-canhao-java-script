
//variaveis que recebem o botão, e variavel que recebe o setInterval
var button = document.getElementById('shoot');
var buttonRestart = document.getElementById('restart');

var timer = null;


//variaveis do Canvas
var screen = document.querySelector("canvas");
var brush = screen.getContext('2d');

//objeto que segura todas as variáveis iniciais da bola
let ball = {
    positionX: 105,
    positionY: 520,
    speedX: 0,
    speedY: 0,
    gravity: .2,
    radius: 11
}

//idenitifica o final do jogo
let endGame = false;

// variavel que recebe a imagem
let canon = new Image();
canon.src = "img/cannon.png";


//inicia o jogo pegando o valor de dentro dos input
function clickButton() {
    let speed = document.getElementById('speed').value;
    let angle = document.getElementById('angle').value;

    if (angle < 0 || angle > 90) {
        alert("Digite um ângulo inválido!");
    }else if(speed < 0){
        alert("Digite uma velocidade válida!");

    } else {
        //chama função que faz o calculo da velocidade e ângulo
        calcSpeedAngle(speed, angle);
        //start no jogo, iniciando o setInterval
        timer = setInterval(updateScreen, 1000 / 60);
        button.style.display = 'none';
    }
}


//função que calcula as velocidades x e y a partir da velocidade do angulo
function calcSpeedAngle(speed, angle) {
    ball.speedX = Math.cos(angle * Math.PI / 180) * speed;
    ball.speedY = - Math.sin(angle * Math.PI / 180) * speed;
}

//função que desenha a bola
function drawBall(x, y, radius) {
    brush.fillStyle = 'black';
    brush.beginPath();
    brush.arc(x, y, radius, 0, 2 * Math.PI);
    brush.fill();

}

//função que desenha o fundo do joguinho
function drawBackground() {
    //back ground render:
    brush.fillStyle = '#ededed';
    brush.fillRect(0, 0, 1000, 600);
    brush.fillStyle = '#1aab00';
    brush.fillRect(0, 550, 1000, 50);
}

//função que desenha o canhão
function drawCanon() {
    brush.drawImage(canon, 30, 520, 70, 70)
}

//função que reseta o objeto da bola
function resetBall() {
    ball = {
        positionX: 105,
        positionY: 520,
        speedX: 0,
        speedY: 0,
        gravity: .2,
        radius: 11
    }
}

//atualiza o objeto da bola para a posição e velocidade que o usuário digita
function updateBall() {
    ball.speedY = ball.speedY + ball.gravity
    ball.positionX = ball.positionX + ball.speedX;
    ball.positionY = ball.positionY + ball.speedY;
}

//checa se a bola chegou no gramado
function checkColision() {
    if (ball.positionY >= (screen.height - 20))  {
        endGame = true;
    }
}
//Função que inicializa o jogo
function startGame(){
    drawBackground();
    resetBall()
    drawBall(ball.positionX, ball.positionY, 11);
    drawCanon();
    canon.onload = () => {
        brush.drawImage(canon, 30, 520, 70, 70);
    }
    button.style.display = 'block';
    buttonRestart.style.display = "none";
}
//Função que reinicia o jogo.
function restartGame() {
    startGame();
    endGame = false;
    clearInterval(timer);
}

// Inicializaçao do jogo
if (!endGame){
    startGame()
    
}


// Função que faz o jogo funcionar
function updateScreen() {
    checkColision();
    if (!endGame) {
        drawBackground();
        drawBall(ball.positionX, ball.positionY, 11);
        updateBall();
        drawCanon()

    }else{
        button.style.display = 'none';
        buttonRestart.style.display = "block";    
    }

}





