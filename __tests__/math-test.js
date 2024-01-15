const assert = require('assert')

module.exports = quark => {
        // Math
    assert.strictEqual(quark.eval(['+', 1, 5]), 6);
    assert.strictEqual(quark.eval(['+', ['+', 4, 3], 5]), 12);
    assert.strictEqual(quark.eval(['*', ['*', 4, 3], 5]), 60);

};