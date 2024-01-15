const { test } = require('./test-util');

module.exports = quark => {

    test(quark,`
    (begin
        (var square (lambda (x) (* x x)))
          (square 2)
    )`, 
  4);

  test(quark,`
        (begin
            (def onClick(callback) 
            (begin 
                (var x 10)
                (var y 20)
                (callback (+ x y))))
              (onClick (lambda (data) (* data 10)))
        )`, 
      300);
  

      // Immediately-invoked lambda expression - IILE:

      test(quark,`
      ((lambda (x) (* x x)) 2)`, 
        4); 
 
};

