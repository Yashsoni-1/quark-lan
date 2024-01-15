const assert = require('assert');
const { test } = require('./test-util');

module.exports = quark => {

    // Math Functions

    test(quark, `(+ 1 5)`, 6);
    test(quark, `(+ (+ 4 5) 5)`, 14);
    test(quark, `(* (* 2 3) 6)`, 36);
    test(quark, `(/ 6 6)`, 1);
    
    // Comparision
    
    test(quark, `(> 1 5)`, false);
    test(quark, `(>= 1 5)`, false);
    test(quark, `(= 3 3)`, true);
    test(quark, `(< 1 5)`, true);
    test(quark, `(<= 1 5)`, true);



};