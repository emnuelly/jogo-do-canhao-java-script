let resolution = {
    width: window.innerWidth,
    height: window.innerHeight - 5
}


let screen = document.querySelector("canvas");
screen.setAttribute('height', resolution.height)
screen.setAttribute('width', resolution.width)



let myEngine = new GameEngine(screen)
let myFloor = new Floor("floor", resolution);
let myBackground = new Background("background", resolution);
let cannonGame = new Game(myEngine)
let controls = new TouchControls(screen);
let myRooster = new Rooster(myEngine)

let myCannon1 = new Cannon(myEngine, "cannon1", {
    x: 30,
    y: resolution.height - 95
}, true, resolution);

let myCannon2 = new Cannon(myEngine, "cannon2", {
    x: resolution.width - 90,
    y: resolution.height - 95
}, false, resolution);

cannonGame.addElement(myBackground);
cannonGame.addElement(myFloor);
cannonGame.addElement(myCannon1);
cannonGame.addElement(myCannon2);
cannonGame.addElement(myRooster)

cannonGame.setControls(controls);


cannonGame.start();