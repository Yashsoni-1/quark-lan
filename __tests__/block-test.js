const assert = require('assert')
const test_Util = require('./test-util')

module.exports = quark => {

// Blocks
assert.strictEqual(quark.eval(['begin',
                                ['var', 'hi', 10],
                                ['var', 'hj', 20],
                                ['+', ['*', 'hi', 'hj'], 
                                30]]), 230);

assert.strictEqual(quark.eval([
    'begin',
    ['var', 'x', 10],
    [
        'begin', 
        ['var', 'x', 20], 
        'x'
    ],
    'x'
]), 10);

assert.strictEqual(quark.eval(['begin',
['var', 'value', 10],
['var', 'result', ['begin', ['var', 't', ['+', 'value', 20]], 't']],
'result'
]), 30);


assert.strictEqual(quark.eval(['begin',
['var', 'data', 10],
['begin', ['set', 'data', 20]],
'data'
]), 20);

test_Util.test(quark, `
    (begin
        (var x 10)
        (var y 20)
        (+ (* x 10) y))`, 120);

};