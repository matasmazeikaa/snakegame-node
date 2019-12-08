class Movement {
    up() {
        return 'up'
    }

    down() {
        return 'down';
    }

    right() {
        return 'right';
    }

    left() {
        return 'left';
    }
}

class Command {
    constructor(subject) {
        this._subject = subject;
        this.commandsExecuted = [];
    }

    execute(command) {
        this.commandsExecuted.push(command);
        return this._subject[command]();
    }
}

module.exports.Command = new Command(new Movement) 
module.exports.Movement = Movement
