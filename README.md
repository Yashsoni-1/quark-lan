# quark-lan

2.1 - 5:00

# Language used - Python

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


