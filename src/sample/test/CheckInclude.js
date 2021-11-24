function CheckInclude(a, b) {
    let tmp = [...a]
    let newArrayOfDate = [];
    tmp.forEach(function(item) {
        newArrayOfDate.push(item.date);
    });

    return newArrayOfDate.includes(b)

}
module.exports = CheckInclude;