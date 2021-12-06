const group = require('./groupByKey');


test('3', () => {
    expect(group([{date: '11/20/2021', response : 3},{date:'11/21/2021', response:4}], '11/21/2021')).toBe(4);
});

test('undefined', () => {
    expect(group([{date: '11/20/2021', response : 3},[{date:'11/21/2021', response:4}]], '11/22/2021')).toBe('');
});
