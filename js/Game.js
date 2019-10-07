class Game {
  constructor(gameEngine) {
    this.gameEngine = gameEngine;
    this.playerOne = true;
    this.controls = null;
    this.ai = null;
  }

  setControls(controls) {
    this.controls = controls;
    controls.start(this);
  }

  setAi(ai) {
    this.ai = ai;
    ai.start(this);
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
    return this.gameEngine;
  }

  play(speed, angle) {
    let enabled = false;
    if (this.gameEngine.findElement('ball')) {
      enabled = this.gameEngine.findElement('ball').enabled;
    }

    if (this.playerOne && !enabled) {
      myCannon1.shoot(-speed, -angle);
      this.playerOne = true

    } else if (!this.playerOne && !enabled) {

      // ==> computador assume o controle 
      // criar classe A.I. (?) 
      //      class AI recebe: nivel de dificuldade, o obj do canhao, 
      // instaciado nesse nivel?
      // a classe AI recebe o canhao (myCannon2) para realizar disparos
      // como a AI calcula a mira? (recebe o balltrajectory??)
      // this.ai.shoot()
      // myCannon2.shoot(-speed, -angle);
      this.playerOne = true;
    }
    this.gameEngine.changeWind()
  }
}