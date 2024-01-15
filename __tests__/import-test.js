const { test } = require('./test-util');

module.exports = quark => {

    test(quark,`
    
    (import Math)

    ((prop Math abs) (- 10))
       `, 10);

    test(quark, 
    `
        (var abs (prop Math abs))
        (abs (- 10))
    `, 10)

    test(quark, 
    `
        (prop Math MAX_VALUE)
    `, 1000)


};

