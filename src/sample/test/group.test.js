const group = require('./groupByKey');

test('T', () => {
    expect(group([{date: 1, type : 2, text : 3},[{date:1, type:2, text:4}]], 'date')).toBe({1:[{date: 1, type : 2, text : 3},[{date:1, type:2, text:4}]]});
});
