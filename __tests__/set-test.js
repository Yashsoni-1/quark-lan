const { test } = require('./test-util');

module.exports = quark => {

    test(quark,`
    (begin 
        (var n1 2)
        (++ n1))`, 
  3);

    test(quark,`
    (begin 
        (var n2 4)
        (-- n2))`, 
  3);

    test(quark,`
    (begin 
        (var n3 2)
        (+= n3 8))`, 
  10);

    test(quark,`
    (begin 
        (var n4 10)
        (-= n4 2))`, 
  8);

  
 
};

