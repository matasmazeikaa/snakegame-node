const Command = require('../Movement').Command;

const commant = Command;

test('if a correct command is passed should return the right command', () => {
    expect(commant.execute('up')).toBe('up');
    expect(commant.execute('down')).toBe('down');
    expect(commant.execute('right')).toBe('right');
    expect(commant.execute('left')).toBe('left');
    expect(commant.commandsExecuted).toStrictEqual(['up', 'down', 'right', 'left']);
})
