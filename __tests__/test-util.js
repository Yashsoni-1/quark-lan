const assert = require('assert')
const quarkParser = require('../parser/quarkParser')

function test(quark, code, expected) {
    const exp = quarkParser.parse(`(begin ${code})`);
    assert.strictEqual(quark.evalGlobal(exp), expected);
}

module.exports = {
    test,
};