const blessed = require('blessed')

const GAME_SPEED = 50
const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
}
const INITIAL_SNAKE_SIZE = 4
const SNAKE_COLOR = 'green'
const DOT_COLOR = 'red'

createGameScreen = () => {
    return {
        parent: screen,
        top: 1,
        left: 0,
        width: '100%',
        height: '100%-1',
        style: {
          fg: 'black',
          bg: 'black',
        }
    }
}

clearScreen = () => {
    gameContainer.detach()
    gameContainer = blessed.box(gameBox)
}

var screen = blessed.screen();
var gameBox = createGameScreen();
var gameContainer = blessed.box(gameBox)

screen.on('keypress', (ch, key) => {
    if ((key.name === 'up' || key.name === 'w') && direction !== 'down') {
        direction = 'up'
      }
      if ((key.name === 'down' || key.name === 's') && direction !== 'up') {
        direction = 'down'
      }
      if ((key.name === 'left' || key.name === 'a') && direction !== 'right') {
        direction = 'left'
      }
      if ((key.name === 'right' || key.name === 'd') && direction !== 'left') {
        direction = 'right'
      }
})

screen.key(['escape', 'q', 'C-c'], (ch, key) => {
    return process.exit(0);
});

draw = (coord, color) => {
    blessed.box({
        parent: gameContainer,
        top: coord.y,
        left: coord.x,
        width: 1,
        height: 1,
        style: {
          fg: color,
          bg: color,
        },
      })
}

var food = {x: 50, y: 0}
var direction = 'right'
var snake = []
for (let i = INITIAL_SNAKE_SIZE; i >= 0; i--) {
    snake[INITIAL_SNAKE_SIZE - i] = { x: i, y: 0 }
}

generateFoodCordinates = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

generateFood = () => {
    food.x = generateFoodCordinates(0, gameContainer.width - 1)
    food.y = generateFoodCordinates(1, gameContainer.height - 1) 

    snake.forEach(cord => {
        if (cord.x === food.x && cord.y === food.y) {
            generateFood();
        }
    })
}

drawFood = () => {
    draw(food, DOT_COLOR)
}


moveSnake = () => {
    const head = {
        x: snake[0].x + DIRECTIONS[direction].x,
        y: snake[0].y + DIRECTIONS[direction].y
    }
    snake.unshift(head)
    if (snake[0].x === food.x && snake[0].y === food.y) {
        generateFood()
      } else {
        snake.pop()
      }
}

drawSnake = () => {
    snake.forEach((cord) => {
        draw(cord, SNAKE_COLOR);
    })
}

tick = () => {
    if (snake[0].x >= gameContainer.width || snake[0].x <= -1 || snake[0].y >= gameContainer.height || snake[0].y <= -1) {
      return process.exit(0);
    }
    clearScreen();
    drawFood();
    drawSnake();
    moveSnake();
    screen.render();
}

start = () => {
    setInterval(() => tick(), GAME_SPEED)
}
generateFood();
start();

