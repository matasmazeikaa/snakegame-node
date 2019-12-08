class UserInput {

    moveUp(key) {
        if (key.name === 'up' || key.name === 'w') {
            return true;
        };
    }

    moveDown(key) {
        if (key.name === 'down' || key.name === 's') {
            return true;
        };
    }

    moveRight(key) {
        if (key.name === 'right' || key.name === 'd') {
            return true;
        };
    }

    moveLeft(key) {
        if (key.name === 'left' || key.name === 'a') {
            return true;
        };
    }
    
}

module.exports.UserInput = UserInput;