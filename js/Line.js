class Line {
    constructor() {
        this.initCoord = {
            x: 0,
            y: 0
        }

        this.actualCoord = {
            x: 0,
            y: 0
        }
        this.color = 'gray';

    }

    setColor(color) {
        this.color = color;
    }

    update() {


    }

    draw(brush) {
        brush.beginPath()
        brush.lineWidth = 5;
        brush.strokeStyle = this.color
        brush.setLineDash([5, 20]);
        brush.moveTo(this.initCoord.x, this.initCoord.y)
        brush.lineTo(this.actualCoord.x, this.actualCoord.y)
        brush.stroke();
    }
}