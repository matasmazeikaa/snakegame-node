const SuperFastSnake = (game) => {
    game._snakeSpeed = game._snakeSpeed - 25;
    return game;
}

module.exports.SuperFastSnake = SuperFastSnake