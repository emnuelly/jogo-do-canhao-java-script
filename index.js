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
let myWall;
if (resolution.width >= resolution.height) {
  myWall = new Wall('wall', {
    x: (resolution.width / 2) - 25,
    y: (resolution.height * 8 / 12)
  }, resolution.width / 23, resolution.height * 3 / 4);
} else {
  myWall = new Wall('wall', {
    x: (resolution.width / 2) - 25,
    y: (resolution.height * 10 / 12)
  }, resolution.width / 23, resolution.height * 3 / 4);
}

// aqui tem um gato... 
myEngine.addElement(new Ball(myEngine, 'ball', 0, 0, 0, 0, ''));
// gato termina aqui...

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

let myAi = new Ai(myEngine, myCannon2);
myEngine.setAi(myAi)

myEngine.addColideElement(myCannon1);
myEngine.addColideElement(myCannon2);
myEngine.addColideElement(myFloor);
myEngine.addColideElement(myWall);

cannonGame.addElement(myBackground);
cannonGame.addElement(myFloor);
cannonGame.addElement(myCannon1);
cannonGame.addElement(myCannon2);
cannonGame.addElement(myRooster);
cannonGame.addElement(myWall);
cannonGame.addElement(myAi);

cannonGame.setControls(controls);
cannonGame.setAi(myAi);

cannonGame.start();