const blessed = require('blessed')
const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
}

createGameScreen = () => {
    return {
        parent: screen,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%-1',
        style: {
          fg: 'black',
          bg: 'black',
          focus: {
            bg: 'black'
          }
        },
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
        cursor: {

        },
        style: {
          fg: color,
          bg: color,
          underline: false,
          blink: false,
          inverse: false,
          invisible: false,
          transparent: false,
        },
      })
}

var startGameScreen = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: '1. Start game \n2. Exit game',
  tags: true,
  cursor: {
    blink: false
  },
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
})

var gameOverScreen = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'YOU LOSE :(',
  tags: true,
  cursor: {
    blink: false
  },
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
})

screen.append(startGameScreen)

var food = {x: 0, y: 0}
var direction = 'right'
var snake = []
var speed = 50
var startGame;
for (let i = 4; i >= 0; i--) {
    snake[4 - i] = { x: i, y: 0 }
}

generateFoodCordinates = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

generateFood = () => {
    food.x = generateFoodCordinates(10, gameContainer.width)
    food.y = generateFoodCordinates(10, gameContainer.height) 
}

drawFood = () => {
    draw(food, 'red')
}


moveSnake = () => {
    const head = {
        x: snake[0].x + DIRECTIONS[direction].x,
        y: snake[0].y + DIRECTIONS[direction].y
    }

    snake.unshift(head)
    if (snake[0].x === food.x && snake[0].y === food.y) {
        speed -= 5;
        clearInterval(startGame);
        start();
      } else {
        snake.pop()
      }
}

drawSnake = () => {
    snake.forEach((cord) => {
        draw(cord, 'green');
    })
}

tick = () => {
    if (snake[0].x >= gameContainer.width || snake[0].x <= -1 || snake[0].y >= gameContainer.height || snake[0].y <= -1) {
      clearScreen();
      screen.append(startGameScreen);
      screen.render();
    }
    clearScreen();
    drawFood();
    drawSnake();
    moveSnake();
    screen.render();
}

start = () => {
   startGame = setInterval(() => tick(), speed)
}

startGameScreen.key('1', (ch, key) => {
    gameContainer.focus()
    generateFood();
    start();
})

startGameScreen.key('2', (ch, key) => {
  return process.exit(0);
})

startGameScreen.focus();
screen.render();
