# quark-lan

2.1 - 5:00


## S - Expressions

## Self-evaluating expressions
## Environment 
### Environment Interface
- Define a variable
- Assign a new value to a variable
- Lookup a variable

## Variable Declaration

#Python - foo = 10
#Javascript - let foo = 10;
#quark - (var foo 10)

## Assignment Expression

#Python - foo = 10
#Javascript - let foo = 10;
#quark - (set foo 10)

## Block Scope
#Javascript - let x = 10; console.log(x) // 10 {let x = 20; console.log(x) // 20} console.log(x) // 10
#C++ - int x = 10; std::cout << x // 10 {int x = 20; std::cout << x // 20} std::cout << x // 10
#Javascript - (var x 10) (print x) // 10 (begin(var x 20); (print x) // 20) (print x) // 10

## Assignment Expression
#Javascript - let x = 10; console.log(x) // 10 {x = 20; console.log(x) // 20} console.log(x) // 20
#C++ - int x = 10; std::cout << x // 10 {x = 20; std::cout << x // 20} std::cout << x // 20
#Javascript - (var x 10) (print x) // 10 (begin(set x 20); (print x) // 20) (print x) // 20

-- Operator Overloading
## Closure : a function which captures its definition environment
-- All functions in quark are closures
-- activation record - static linking(the one where the fn is defined not where it is called(dynamic linking))
-- First class functions - which cna 

## Lambda Expression with IILE property
#Python - lambda x: x * x
#Javascript - x => x * x;
#Quark - (lambda (x) (* x x))

## Class - a named environment which can be instantiated and create objects
## Module Objects - a named first class environment

- Developed an interpreter for a Quark programming language with syntax resembling JavaScript and Python, enabling code interpretation and execution through semantic analysis and a runtime environment.
** Implemented low-level advanced features such as first-class functions, lambdas, closures, and activation records, showcasing a strong understanding of functional programming principles. Additionally, incorporated object-oriented programming (OOP) concepts, including the design and implementation of classes and inheritance structures, demonstrating versatility in both functional and object-oriented paradigms.
- Implemented low-level advanced features such as first-class functions, lambdas, closures, and activation records. Additionally, incorporated object-oriented programming (OOP) concepts, including the design and implementation of classes and inheritance structures.








