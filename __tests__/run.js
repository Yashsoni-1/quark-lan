//--------------------------------------------------------
// Test

const Quark = require('../quark')
const Environment = require('../Environment')

const tests = [
    require('./self-eval-test'),
    require('./math-test'),
    require('./variables-test'),
    require('./block-test'),
    require('./while-test'),
    require('./if-test'),
    require('./built-in-function-test'),
    require('./user-defined-function-test'),
    require('./lambda-function-test'),
    require('./switch-test'),
    require('./for-test.js'),
    require('./set-test.js'),
    require('./class-test.js'),
    require('./module-test.js'),
    require('./import-test.js'),
];

const quark = new Quark();

tests.forEach(test => test(quark));

console.log('All assertions passed!');
