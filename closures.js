/*
 * When functions are defined,
 * if they reference values defined outside their own lexical scope
 * they will retain access to these values when called,
 * wherever they are called.
 *
 * Functions that retain access to values defined
 * outside their own local scope are called
 * closures.
 */


let valueOutsideFunction = 'outside of function';

function logValueOutsideLexicalScope() {
  console.log(valueOutsideFunction);
}

logValueOutsideLexicalScope();

/*
 * Recall that functions can return function definitions,
 * and that the returned function definitions can be called later
 * like any other function definition.
 */

function returnLogger() {
  let logger = function() {
    console.log('logger');
  }
  return logger;
}

let logger = returnLogger();
logger();

/*
 * We can also pass functions as values into other functions.
 */

function returnFunction(fn) {
  return fn;
}

function printer() {
  console.log('printer');
}

let newPrinter = returnFunction(printer);

newPrinter();

/*
 * When we return function definitions from outer functions,
 * the same rule about continued access to variables outside
 * the lexical scope of the function definition applies.
 */

let one = 1;

function returnPrintOne() {
  let printOne  = function() {
    console.log(one)
  }
  return printOne;
}

let printOne = returnPrintOne();
printOne();

/*
 * The value that the inner function retains access to
 * can be in any outer scope, not just the most outer.
 */

function returnPrintTwo() {

  let two = 2;

  let printTwo  = function() {
    console.log(two)
  }
  return printTwo;
}

let printTwo = returnPrintTwo();
printTwo();

/*
 * Please note that the following does not
 * behave as expected.
 */

function brokenReturnPrintTwo() {

  let two = 2;

  let brokenPrintTwo  = function(two) {
    console.log(two)
  }
  return brokenPrintTwo;
}

let brokenPrintTwo = brokenReturnPrintTwo();
brokenPrintTwo();

/*
 * Closures can also retain access to values passed into
 * outer functions as arguments.
 */

function returnPrintNum(num) {

  let printNum  = function() {
    console.log(num)
  }
  return printNum;
}

let printThree = returnPrintNum(3);
printThree();

/*
 * In the wild, it is common to return anonymous functions,
 * rather than a variable containing an anonymous function.
 */

function conciseReturnPrintNum(num) {

  return function() {
    console.log(num)
  }

}

let printFour = returnPrintNum(4);
printFour();

/*
 * Arrow function expressions can make our code even more concise,
 * for better or worse.
 */

let moreConciseReturnPrintNum = num => () => { console.log(num) }

let printFive = returnPrintNum(5);
printFive();
