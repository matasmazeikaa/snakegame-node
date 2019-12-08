const Movement = require('../Movement').Movement;

const movement = new Movement();

test('if key name entered is left or a should return true', () => {
    expect(movement.up()).toBe('up');
    expect(movement.down()).toBe('down');
    expect(movement.right()).toBe('right');
    expect(movement.left()).toBe('left');
})
