/**
 * Currying in JavaScript is a technique 
 * where a function with multiple arguments is transformed into a sequence of functions, 
 * each taking one (or fewer) arguments at a time.
 * It allows partial application, so you can create specialized functions by fixing some arguments in advance.
 * @param  {...any} args 
 * @returns 
 */
function sum(...args) {
  let total = args.reduce((acc, curr) => acc + curr, 0);

  return function inner(...args2) {
    if (args2.length === 0) {
      return total;
    }

    total = total + args2.reduce((acc, curr) => acc + curr, 0);
    // return sum(total);
    return inner;
  };
}

console.log("sum(10)(20, 30)(40, 50)(50)() = ", sum(10)(20, 30)(40, 50)(50)());
console.log("sum(1, 2)(3)(4, 5, 6)(7)() = ", sum(1, 2)(3)(4, 5, 6)(7)());
console.log("sum(0)(10)(20)(30)() = ", sum(0)(10)(20)(30)());
console.log("sum(1)(5, 7, 9)(2, 4, 6, 8)() = ", sum(1)(5, 7, 9)(2, 4, 6, 8)());
