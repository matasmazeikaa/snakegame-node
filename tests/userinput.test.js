const UserInput = require('../UserInput').UserInput;
const init = new UserInput();

test('if key name entered is up or w should return true', () => {
    expect(init.moveUp({name: 'up'})).toBe(true);
    expect(init.moveUp({name: 'w'})).toBe(true);
})

test('if key name entered is down or s should return true', () => {
    expect(init.moveDown({name: 'down'})).toBe(true);
    expect(init.moveDown({name: 's'})).toBe(true);
})

test('if key name entered is right dr w should return true', () => {
    expect(init.moveRight({name: 'right'})).toBe(true);
    expect(init.moveRight({name: 'd'})).toBe(true);
})

test('if key name entered is left or a should return true', () => {
    expect(init.moveLeft({name: 'left'})).toBe(true);
    expect(init.moveLeft({name: 'a'})).toBe(true);
})

test('if key name entered random is enter should return undefined', () => {
    expect(init.moveLeft({name: 'lefsafft'})).toBe(undefined);
    expect(init.moveLeft({name: 'aaa'})).toBe(undefined);
})
