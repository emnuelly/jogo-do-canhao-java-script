class Wall {
    constructor(name, position, width, height) {
        this.name = name;
        this.position = position; // {x,y}
        this.width = width;
        this.height = height;
    }

    update() {}

    draw(brush) {
        brush.beginPath();
        brush.fillStyle = '#b3530e';
        brush.fillRect(this.position.x, this.position.y, this.width, this.height);
        brush.fill();
    }

}