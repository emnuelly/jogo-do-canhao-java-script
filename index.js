let resolution = {
    width: window.innerWidth,
    height: window.innerHeight - 5
}

let myControls = {
    buttonShoot: document.getElementById('shoot'),
    buttonRestart: document.getElementById('restart')
};

let screen = document.querySelector("canvas");
screen.setAttribute('height', resolution.height)
screen.setAttribute('width', resolution.width)

let hammer = new Hammer(screen);
hammer.add(new Hammer.Pan({
    direction: Hammer.DIRECTION_ALL,
    threshold: 0
}));


let myEngine = new GameEngine(screen)

// adiciona todos os elementos


let myFloor = new Floor("floor", resolution);
let myBackground = new Background("background", resolution);

let cannonGame = new Game(myEngine, myControls)

let myCannon1 = new Cannon("cannon1", {
    x: 30,
    y: resolution.height - 95
}, false, Ball, cannonGame);

let myCannon2 = new Cannon("cannon2", {
    x: resolution.width - 90,
    y: resolution.height - 95
}, true, Ball, cannonGame);

// teste hammer

hammer.on("pan", ev => {

    if (ev.isFinal) {
        console.log(ev.angle, ev.distance)
        cannonGame.play(ev.distance, ev.angle)

    }
})


cannonGame.addElement(myBackground);
cannonGame.addElement(myFloor);
cannonGame.addElement(myCannon1);
cannonGame.addElement(myCannon2);

cannonGame.start();