let resolution = {
  width: window.innerWidth,
  height: window.innerHeight - 5
};

let screen = document.querySelector('canvas');
screen.setAttribute('height', resolution.height);
screen.setAttribute('width', resolution.width);

let myEngine = new GameEngine(screen);
let myFloor = new Floor('floor', resolution);
let myBackground = new Background(myEngine, 'background', resolution);
let cannonGame = new Game(myEngine);
let controls = new TouchControls(myEngine, screen, resolution);

let myRooster = new Rooster(myEngine);
let myCannon1 = new Cannon(
  myEngine,
  'cannonLeft', {
    x: 30,
    y: resolution.height - 95
  },
  true,
  resolution
);

let myCannon2 = new Cannon(
  myEngine,
  'cannonRight', {
    x: resolution.width - 90,
    y: resolution.height - 95
  },
  false,
  resolution
);

cannonGame.addElement(myBackground);
cannonGame.addElement(myFloor);
cannonGame.addElement(myCannon1);
cannonGame.addElement(myCannon2);
cannonGame.addElement(myRooster);

cannonGame.setControls(controls);

cannonGame.start();