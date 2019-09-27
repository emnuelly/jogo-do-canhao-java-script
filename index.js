let resolution = {
    width: window.innerWidth,
    height: window.innerHeight - 5
}


let screen = document.querySelector("canvas");
screen.setAttribute('height', resolution.height)
screen.setAttribute('width', resolution.width)

let hammer = new Hammer(screen);
hammer.add(new Hammer.Pan({
    direction: Hammer.DIRECTION_ALL,
    threshold: 0
}));

let isDragging = false;
let initCoord = {
    x: 0,
    y: 0
}
let finalCoord = {
    x: 0,
    y: 0
}
let myEngine = new GameEngine(screen)
let myFloor = new Floor("floor", resolution);
let myBackground = new Background("background", resolution);
let cannonGame = new Game(myEngine)

hammer.on("pan", ev => {

    if (!isDragging) {
        initCoord = ev.center
    }
    // myEngine.drawLine(ev, initCoord)

    if (ev.isFinal) {
        cannonGame.play(ev.distance, ev.angle)

    }
    finalCoord = ev.center
})






let myCannon1 = new Cannon("cannon1", {
    x: 30,
    y: resolution.height - 95
}, false, Ball, resolution, true);

let myCannon2 = new Cannon("cannon2", {
    x: resolution.width - 90,
    y: resolution.height - 95
}, true, Ball, resolution, false);



cannonGame.addElement(myBackground);
cannonGame.addElement(myFloor);
cannonGame.addElement(myCannon1);
cannonGame.addElement(myCannon2);


cannonGame.start();