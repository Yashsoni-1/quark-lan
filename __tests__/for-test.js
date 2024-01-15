const { test } = require('./test-util');

module.exports = quark => {

    test(quark,`
    (for (var x 10) 
         (> x 0)
         (-- x)
         x)`, 
  0);

  
 
};

