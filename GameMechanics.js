const {
    DIRECTIONS,
    SNAKE_COLOR,
    SNAKE_SIZE,
    DOT_COLOR
} = require('./configurations')

const UserInterface = require('./UserInterface').UserInterface;
const UserInput = require('./UserInput').UserInput;
const Command = require('./Movement').Command;

class GameMechanics extends UserInterface {
    constructor() {
        super();
        this.bindKeyHandlersToScreen(this.changeDirection.bind(this), this.quitGame.bind(this), this.startGame.bind(this));
        this.input = new UserInput();
        this.command = Command;
    }

    initialize() {
        this.snake = [];
        for (let i = SNAKE_SIZE; i >= 0; i--) {
            this.snake[SNAKE_SIZE - i] = {
                x: i,
                y: 0
            }
        }
        this.food = {}
        this.score = 0
        this.currentDirection = 'right'
        this.changingDirection = false
        this.timer = null
        this.generateFood()
        this.updateScore(0)
        this.renderScreen()
    }

    changeDirection(_, key) {
        if (this.input.moveUp(key) && this.currentDirection !== 'down') {
            this.currentDirection = this.command.execute('up')
        }
        if (this.input.moveDown(key) && this.currentDirection !== 'up') {
            this.currentDirection = this.command.execute('down')
        }
        if (this.input.moveRight(key) && this.currentDirection !== 'left') {
            this.currentDirection = this.command.execute('right')
        }
        if (this.input.moveLeft(key) && this.currentDirection !== 'right') {
            this.currentDirection = this.command.execute('left')
        }
    }

    moveSnake() {
        if (this.changingDirection) {
            return;
        }
        this.changingDirection = true;

        const head = {
            x: this.snake[0].x + DIRECTIONS[this.currentDirection].x,
            y: this.snake[0].y + DIRECTIONS[this.currentDirection].y
        };

        this.snake.unshift(head);

        if (this.snake[0].x === this.food.x && this.snake[0].y === this.food.y) {
            this.score++;
            this.updateScore(this.score);
            this.generateFood();
        } else {
            this.snake.pop();
        };
    }

    generateRandomPixelCoordinates(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    generateFood() {
        this.food.x = this.generateRandomPixelCoordinates(0, this.gameContainer.width - 1);
        this.food.y = this.generateRandomPixelCoordinates(1, this.gameContainer.height - 1);
    }

    drawSnake() {
        this.snake.forEach(snakeCoordinates => {
            this.draw(snakeCoordinates, SNAKE_COLOR);
        });
    }

    drawFood() {
        this.draw(this.food, DOT_COLOR);
    }

    isGameOver() {
        if (this.snake[0].x <= - 1 || this.snake[0].x >= this.gameContainer.width - 1 || this.snake[0].y >= this.gameContainer.height - 1 || this.snake[0].y <= -1) {
            return true;
        } else {
            return false;
        }
    }

    quitGame() {
        process.exit(0);
    }
};

module.exports.GameMechanics = GameMechanics;