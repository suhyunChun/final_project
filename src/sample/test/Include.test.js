const include = require('./CheckInclude');

test('T', () => {
    expect(include([{date: 1, type : 2, text : 3}], 1)).toBe(true);
});

test('F', () => {
    expect(include([{date: 1, type : 2, text : 3}], 5)).toBe(false);
});