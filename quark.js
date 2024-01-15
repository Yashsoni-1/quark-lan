/**
 * Quark programming language
 * 
 * Quark Interpreter
 * 
 * AST Interpreter
 */


const Environment = require('./Environment');
const Transformer = require('./transform/Transformer');
const quarkParser = require('./parser/quarkParser');

const fs = require('fs')

class Quark{

    constructor (global = GlobalEnvironment)
    {
        this.global = global;
        this._transformer = new Transformer();
    }

    /**
     * Evaluates global code wrapping into a block.
     */
    evalGlobal(exp) {
        return this._evalBody(exp, this.global)
    }

    eval(exp, env=this.global){
        
        if (this._is_number(exp))
            return exp;
        
        if (this._is_string(exp))
            return exp.slice(1, -1)
        
        //--------------------------------------------------------
        // Block Sequence of expressions

        if (exp[0] === 'begin'){
            const block_env = new Environment({}, env)
            return this._eval_block(exp, block_env)
        }

        //--------------------------------------------------------
        // Variable Declaration: (var foo 10)
        if (exp[0] === 'var'){
            const [_, name, value] = exp;
            return env.define(name, this.eval(value, env));
        }
        
        //--------------------------------------------------------
        // Variable Update: (set foo 10)
        if (exp[0] === 'set'){
            const [_, ref, value] = exp;

            // Assignment to a property:

            if(ref[0] === 'prop') {
                const [_tag, instance, propName] = ref;
                const instanceEnv = this.eval(instance, env);
                return instanceEnv.define(propName, this.eval(value, env));
            }
            return env.assign(ref, this.eval(value, env))
        }
        
        //--------------------------------------------------------
        // Variable Access: (foo)
        if(this._is_variable_name(exp)){
            return env.lookup(exp)
        }
        
        //--------------------------------------------------------
        // if-expression: (if <condition> <consequent> <alternate>)
        if(exp[0] === 'if'){
            const [_, condition, consequent, alternate] = exp
            if (this.eval(condition, env))
                return this.eval(consequent, env);
            else
                return this.eval(alternate, env);   
        }   
        
        //--------------------------------------------------------
        // Switch-Statement 
        /**
         * (switch (<cond1> <block1>)
         *          ...
         *         (<condN> <blockN>)
         *         (else <alternate>))
         */


        if(exp[0] === 'switch') {

            const if_exp = this._transformer.transforSwitchToIfStatement(exp);
            return this.eval(if_exp, env);
        }
        
            
        //--------------------------------------------------------
        // while-expression: (while <condition> <body>)
        if(exp[0] === 'while'){
            const [_, condition, body] = exp
            let result;
            while (this.eval(condition, env))
            result = this.eval(body, env)
        
            return result;
        }
        
        //--------------------------------------------------------
        // for-expression: (for <condition> <body>)
        if(exp[0] === 'for') {
            const whileExp = this._transformer.transformForToWhile(exp);
            return this.eval(whileExp, env);
        }

        //--------------------------------------------------------
        // Increment: (++ foo)
        if(exp[0] === '++') {
            const setExp = this._transformer.transformIncToSet(exp);
            return this.eval(setExp, env);
        }
        
        //--------------------------------------------------------
        // Increment: (-- foo)
        if(exp[0] === '--') {
            const setExp = this._transformer.transformDecToSet(exp);
            return this.eval(setExp, env);
        }
        
        //--------------------------------------------------------
        // Increment: (+= foo 10)
        if(exp[0] === '+=') {
            const setExp = this._transformer.transformAddAssignmentToSet(exp);
            return this.eval(setExp, env);
        }
        
        //--------------------------------------------------------
        // Increment: (-= foo 10)
        if(exp[0] === '-=') {
            const setExp = this._transformer.transformSubtractAssignmentToSet(exp);
            return this.eval(setExp, env);
        }
        
        //--------------------------------------------------------
        // Module Declaration: (module <name> <body>)

        if (exp[0] === 'module') {
            const [_tag, name, body] = exp;

            const moduleEnv = new Environment({}, env);

            this._evalBody(body, moduleEnv);

            return env.define(name, moduleEnv);
        }

        //--------------------------------------------------------
        // Function Declaration: (def square (x) (* x x))
        if(exp[0] === 'def') {
            // JIT-transpile to a variable declaration
            const varExp = this._transformer.transforDefToVarLambda(exp);

            return this.eval(varExp, env);
        }

        
        //--------------------------------------------------------
        // Lambda Functions: (lambda (x) (* x x ))

        if(exp[0] === 'lambda') {
            const [_tag, params, body] = exp;

            return {
                params,
                body,
                env, // Closure
            };
        }

        //--------------------------------------------------------
        // Class declaration: (class <Name> <Parent> <Body>):

        if(exp[0] === 'class') {
            const [_tag, name, parent, body] = exp;

            // A class is an environment! - a storage of methods, 
            // and shared properties:

            const parentEnv = this.eval(parent, env) || env;

            const classEnv = new Environment({}, parentEnv);

            // Body is evaluated in class environment.
            this._evalBody(body, classEnv);

            // class is accessible by name.

            return env.define(name, classEnv);
        }
        
        //--------------------------------------------------------
        // Super expressions: (super <Classname>)

        if(exp[0] === 'super') {
            const [_tag, className] = exp;
            return this.eval(className, env).parent;
        }
        //--------------------------------------------------------
        // Class instantiation: (new <Class> <Arguments> ...)

        if(exp[0] === 'new') {
            /**
             * An instance of a class is an environment!
             * The `parent` component of the instance environment
             * is set to its class.
             */

            const classEnv = this.eval(exp[1], env);
            const instanceEnv = new Environment({}, classEnv);

            const args = exp.slice(2).map(arg => this.eval(arg, env));

            this._callUserDefinedFunction(classEnv.lookup('constructor'), [instanceEnv, ...args]);

            return instanceEnv;
        }

        //--------------------------------------------------------
        // Property access: (prop <instance> <name>)

        if(exp[0] === 'prop') {
            const[_tag, instance, name] = exp;

            const instanceEnv = this.eval(instance, env);

            return instanceEnv.lookup(name);
        }
        
        //--------------------------------------------------------
        // Module import: (import <name>)

        if (exp[0] === 'import') {
            const [_tag, name] = exp;

            const moduleSrc = fs.readFileSync(`${__dirname}/modules/${name}.qk`, 'utf8');

            const body = quarkParser.parse(`(begin ${moduleSrc})`);

            const moduleExp = ['module', name, body];

            return this.eval(moduleExp, this.global);
        }



        //--------------------------------------------------------
        // Function calls:
        // (print "Hello World")
        // (+ x 5)
        // (> 5 4)      true

        if(Array.isArray(exp)) {
            
            const fn = this.eval(exp[0], env);


            const args = exp.slice(1).map(arg => this.eval(arg, env));

            

            // 1. Native Function:
            
            if(typeof fn === 'function') {
                return fn(...args);
            }

            // 2. User-defined Function:

            return this._callUserDefinedFunction(fn, args);
        }

        throw `Unimplemented: ${JSON.stringify(exp)}`;
    }

    _callUserDefinedFunction(fn, args) {
        const activationRecord = {};

            fn.params.forEach((param, index) => {
                activationRecord[param] = args[index];
            });


            const activationEnv = new Environment(activationRecord, fn.env);

            return this._evalBody(fn.body, activationEnv);
    }

    _evalBody(body, env)
    {
        if(body[0] === 'begin')
            return this._eval_block(body, env);
        else
            return this.eval(body, env);
    }
    
    _eval_block(block, env){
        let result;
        const [_tag, ...expressions] = block;
        expressions.forEach(exp => {
            result = this.eval(exp, env);
        });
        
        return result;
    }

    _is_number(exp){
        return typeof exp === 'number';
    }
    
    _is_string(exp){
        return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
    }
    _is_variable_name(exp){
        return typeof exp === 'string' && /^[+\-*/<>=a-zA-Z0-9_]+$/.test(exp);
    }
}


/* 
 * Default Global Environment
 */

const GlobalEnvironment = new Environment({
    null: null,
    true: true,
    false: false,
    VERSION: '0.1',

    // Math operations

    '+'(op1, op2) {
        return op1 + op2;
    },

    '-'(op1, op2 = null) {
        if(op2 == null) {
            return -op1;
        }
        return op1 - op2;
    },

    '*'(op1, op2) {
        return op1 * op2;
    },

    '/'(op1, op2) {
        return op1 / op2;
    },

    // Logical operations

    '<'(op1, op2) {
        return op1 < op2;
    },

    '<='(op1, op2) {
        return op1 <= op2;
    },

    '='(op1, op2) {
        return op1 === op2;
    },

    '>'(op1, op2) {
        return op1 > op2;
    },

    '>='(op1, op2) {
        return op1 >= op2;
    },

    print(...args) {
        console.log(...args);
    },
});

module.exports = Quark;
