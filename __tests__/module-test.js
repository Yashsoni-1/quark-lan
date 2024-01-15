const { test } = require('./test-util');

module.exports = quark => {

    test(quark,`
    (module Math
        (begin
            (def abs (value)
                (if (< value 0)
                    (- value)
                    value))
                    
            (def square (x)
                (* x x))
                
            (var MAX_VALUE 1000)
        )
    )
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

