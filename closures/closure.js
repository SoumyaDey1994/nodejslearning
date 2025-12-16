/**
 * A closure in JS is a function along with its lexical environment.
 * A closure is formed every time a function is created,
 * its local scope bundled together with its surrounding state.
 */

function outer(value) {
  function inner(power) {
    // inner() forms a clousure with its lexical state of outer()
    // Hence value, which is part of local state of outer
    // is accessible to inner even after its returned from outer()
    return Math.pow(value, power);
  }

  return inner;
}

const power = outer(5);
console.log(`Square becomes: ${power(2)}`);
console.log(`Cube becomes: ${power(3)}`);
console.log(`5th powe becomes: ${power(5)}`);
console.log(`10th powe becomes: ${power(10)}`);
console.log(`0.5th powe becomes: ${power(0.5)}`);
