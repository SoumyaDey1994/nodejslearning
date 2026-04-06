/**
 * Date: 6th April, 2026
 */

function throttle(fn, delay) {
  let lastRun = 0;

  return function (...args) {
    const context = this;

    const now = Date.now();
    if (now - lastRun >= delay) {
      lastRun = now;
      fn.apply(context, args);
      console.log(args.join(" "));
    }
  };
}

const delay = 5000;
const throttleFn = throttle(() => {
  console.log(`Calling Throttle Function after ${delay} ms`);
}, delay);

throttleFn("Hello", "Soumya !!", "How", "Are", "You ?");
throttleFn("I", "am", "Fine");
