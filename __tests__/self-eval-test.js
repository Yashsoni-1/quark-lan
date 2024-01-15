const assert = require('assert')

module.exports = quark => {
    assert.strictEqual(quark.eval(1), 1);
    assert.strictEqual(quark.eval('"hello"'), "hello");
};