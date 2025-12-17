/**
 * Promise.all([...])
 * Promise.allSettles([...])
 * Promise.race([...])
 * Promise.any([...])
 */
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("P1 Success");
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("P2 Success");
  }, 12000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("P3 Success");
  }, 3000);
});

const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("P4 Fails");
  }, 4000);
});

/**
 * Promise.all([...]): Waits for all promises in list to get fulfilled(success)
 * If any 1 fails, it doesn't wait for other promises to return
 * If terminates the execution immediately in that case
 */
Promise.all([p1, p2, p3])
  .then((msg) => console.log(msg))
  .catch((err) => console.log(`Error: ${err}`));

/**
 * Promise.allSettled([...]): Waits for all promies to get settled(either fulfilled or rejected)
 * If 1 or more fails, till it waits for remaining promises get completed
 * and returns a Grregated response [{status:..., value/reason: ...}]
 */
Promise.allSettled([p1, p3, p4])
  .then((msg) => console.log(msg))
  .catch((err) => console.log(`Error: ${err}`));

const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("P5 Fails");
  }, 5000);
});

const p6 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("P6 Success");
  }, 6000);
});

/**
 * Promise.race([...]): Just waits for 1 promise to get Settled (fulfill/rejected)
 * As soon as 1 promise gets settled, it returns the response & exists
 */
Promise.race([p4, p5, p6])
  .then((msg) => console.log(msg))
  .catch((err) => console.log(`Error: ${err}`));

/**
 * Promise.any([...]): Waits for 1 promise to get fulfilled
 * Even when there are errors, it waits for first success
 * If all promises gets rejected, then it returns an AggregateError: All promise were rejecetd
 * which consists list of all rejecetd promise errors
 */
Promise.any([p4, p5, p6])
  .then((msg) => console.log(msg))
  .catch((err) => console.log(`Error: ${err.errors}`));

Promise.any([p4, p5])
  .then((msg) => console.log(msg))
  .catch((err) => console.log(`Error: ${err.errors}`));
