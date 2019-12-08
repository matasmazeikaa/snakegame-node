const Game = require('./Game').Game;
const SuperFastSnake = require('./SuperFastSnakeDecorator').SuperFastSnake;

const game = SuperFastSnake(new Game(50));
game.startGame();