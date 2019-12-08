const { GAME_SPEED } = require('./configurations')

const GameMechanics = require('./GameMechanics').GameMechanics;

class Game extends GameMechanics {
    constructor(snakeSpeed) {
        super();
        this._snakeSpeed = snakeSpeed

        this.initialize();
    }

    gameLoop() {
        if (this.isGameOver()) {
            this.showGameOverScreen();
            clearInterval(this.timer);
            this.timer = null;
            return;
        }

        this.changingDirection = false;
        this.clearScreen();
        this.drawFood();
        this.moveSnake();
        this.drawSnake();
        this.renderScreen();
    }

    startGame() {
        if (!this.timer) {
            this.initialize();
            this.timer = setInterval(this.gameLoop.bind(this), this._snakeSpeed)
        }
    }
}

module.exports.Game = Game;