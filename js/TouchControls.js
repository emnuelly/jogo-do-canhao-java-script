class TouchControls {
  constructor(gameEngine, screen, resolution) {
    this.resolution = resolution;
    this.gameEngine = gameEngine;

    this.arc = null;

    this.shootLine = new Line(gameEngine, resolution);
    this.hammer = new Hammer(screen);
    this.isDragging = false;

    this.isPlayerOne = true;
  }

  start(game) {

    this.arc = new BallTrajectory(this.gameEngine, 'arc', game, this.resolution);


    this.hammer.add(
      new Hammer.Pan({
        direction: Hammer.DIRECTION_ALL,
        threshold: 0
      })
    );

    this.hammer.on('pan', ev => {

      if (!this.isDragging) {
        this.shootLine.setColor('gray');
        this.shootLine.setInitCoord(ev.center);
        this.isDragging = true;
      }

      this.shootLine.setActualCoord(ev.center);


      this.arc.clearTrajectory()
      this.arc.setAngleAndSpeed(ev.angle, ev.distance * 3);


      if (ev.isFinal) {
        this.arc.setColor('transparent');
        this.shootLine.setColor('transparent');
        game.play(ev.distance * 3, ev.angle);
        this.isDragging = false;
      }
    });

    game.getGameEngine().addElement(this.arc);
    game.getGameEngine().addElement(this.shootLine);
  }
}