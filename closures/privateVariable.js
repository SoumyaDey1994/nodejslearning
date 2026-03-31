function createCounter() {
  let count = 0; // private variable

  return {
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    getCount() {
      return count;
    },
  };
}

const counter = createCounter();

counter.increment();
counter.increment();
console.log("Count after 2 INCR: ", counter.getCount()); // 2

counter.increment();
counter.increment();
counter.increment();
counter.increment();
counter.increment();
console.log("Count after 2+5 INCR: ", counter.getCount()); // 2

console.log("Counter with direct access: ", counter.count); // undefined (not accessible)
