const assert = require('assert')

module.exports = quark => {


    // Variables
    assert.strictEqual(quark.eval(['var', 'x', 10]), 10);
    assert.strictEqual(quark.eval('x'), 10);
    assert.strictEqual(quark.eval(['var', 'y', 100]), 100);
    assert.strictEqual(quark.eval('y'), 100);
    assert.strictEqual(quark.eval('true'), true);
    assert.strictEqual(quark.eval(['var', 'isUser', 'true']), true);



};