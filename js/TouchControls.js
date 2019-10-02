class TouchControls {
  constructor(gameEngine, screen, resolution) {
    this.resolution = resolution;
    this.gameEngine = gameEngine;

    this.shootLine = new Line(gameEngine, resolution);
    this.hammer = new Hammer(screen);
    this.isDragging = false;
  }

  start(game) {
    this.hammer.add(
      new Hammer.Pan({
        direction: Hammer.DIRECTION_ALL,
        threshold: 0
      })
    );
    this.hammer.on('pan', ev => {
      if (!this.isDragging) {
        this.shootLine.setColor('gray');
        this.shootLine.initCoord = ev.center;
        this.isDragging = true;
      }

      this.shootLine.actualCoord = ev.center;
      this.shootLine.angle = ev.angle;
      this.shootLine.speed = ev.distance * 3;

      this.shootLine.calcImpactPointX();

      if (ev.isFinal) {
        this.shootLine.setColor('transparent');
        game.play(ev.distance * 3, ev.angle);
        this.isDragging = false;
      }
    });

    game.getGameEngine().addElement(this.shootLine);
  }
}
