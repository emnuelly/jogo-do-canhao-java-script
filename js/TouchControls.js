class TouchControls {

    constructor(screen) {

        this.shootLine = new Line();
        this.hammer = new Hammer(screen);
        this.isDragging = false;



    }

    start(game) {
        this.hammer.add(new Hammer.Pan({
            direction: Hammer.DIRECTION_ALL,
            threshold: 0
        }));
        this.hammer.on("pan", ev => {

            if (!this.isDragging) {
                this.shootLine.setColor('gray');
                this.shootLine.initCoord = ev.center;
                this.isDragging = true
            }

            this.shootLine.actualCoord = ev.center;

            if (ev.isFinal) {
                this.shootLine.setColor('transparent');
                game.play(ev.distance * 3, ev.angle)
                this.isDragging = false;
            }
        })

        game.getGameEngine().addElement(this.shootLine);
    }
}