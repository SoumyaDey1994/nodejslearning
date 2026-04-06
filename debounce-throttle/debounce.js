/**
 * Date: 6th April, 2026
 */
function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    const context = this;

    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
      console.log(args.join(" "));
    }, delay);
  };
}

const delay = 5000;
const debounceFn = debounce(() => {
  console.log(`Calling Debounce Function after ${delay} ms`);
}, delay);

debounceFn("Hello", "Soumya !!", "How", "Are", "You ?");
