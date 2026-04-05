/**
 * Promise.all([...]): Waits for all promises in list to get fulfilled(success)
 * If any 1 fails, it doesn't wait for other promises to return
 * If terminates the execution immediately in that case
 */
Promise.prototype.myAll = (pr) => {
  return new Promise((resolve, reject) => {
    if (!pr) resolve();
    if (pr.length === 0) resolve([]);

    const result = [];
    pr.forEach((pm, index) => {
      Promise.resolve(pm)
        .then((res) => {
          result[index] = res;
          if (result.length === pr.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};
/**
 * Promise.allSettled([...]): Waits for all promies to get settled(either fulfilled or rejected)
 * If 1 or more fails, till it waits for remaining promises get completed
 * and returns a Grregated response [{status:..., value/reason: ...}]
 */

Promise.prototype.myAllSettled = (pr) => {
  return new Promise((resolve, reject) => {
    if (!pr) resolve();
    if (pr.length === 0) resolve([]);

    const result = [];
    let completedCount = 0;

    pr.forEach((pm, index) => {
      Promise.resolve(pm)
        .then((res) => {
          completedCount++;
          result[index] = {
            status: "fulfilled",
            value: res,
          };
        })
        .catch((err) => {
          completedCount++;
          result[index] = {
            status: "rejected",
            reason: err,
          };
        })
        .finally(() => {
          if (completedCount === pr.length) {
            resolve(result);
          }
        });
    });
  });
};
/**
 * Promise.race([...]): Just waits for 1 promise to get Settled (fulfill/rejected)
 * As soon as 1 promise gets settled, it returns the response & exists
 */

Promise.prototype.myRace = (pr) => {
  return new Promise((resolve, reject) => {
    if (!pr) resolve();
    if (pr.length === 0) resolve([]);
    pr.forEach((pm) => Promise.resolve(pm).then(resolve).catch(reject));
  });
};

/**
 * Promise.any([...]): Waits for 1 promise to get fulfilled
 * Even when there are errors, it waits for first success
 * If all promises gets rejected, then it returns an AggregateError: All promise were rejecetd
 * which consists list of all rejecetd promise errors
 */

Promise.prototype.myAny = (pr) => {
  return new Promise((resolve, reject) => {
    if (!pr) resolve();
    if (pr.length === 0) resolve();

    const errorResults = [];
    pr.forEach((pm, index) => {
      Promise.resolve(pm)
        .then(resolve)
        .catch((err) => {
          errorResults[index] = err;

          if (errorResults.length === pr.length) {
            reject(
              new AggregateError(
                errorResults,
                "Polyfill myAll: All Promises were rejected",
              ),
            );
          }
        });
    });
  });
};

const p1 = new Promise((resolve) => setTimeout(() => resolve("P1"), 100));
const p2 = new Promise((resolve) => setTimeout(() => resolve("P2"), 2000));
const p3 = new Promise((resolve) => setTimeout(() => resolve("P3"), 3000));
const p4 = new Promise((resolve, reject) =>
  setTimeout(() => reject("P4"), 500),
);
const p5 = 5;
const p6 = new Promise((resolve, reject) =>
  setTimeout(() => reject("P6"), 1000),
);

console.log(`.........Promise all() test...........`);

Promise.all([p1, p2, p3])
  .then((res) => console.log("Pre-defined all() result: ", res))
  .catch((err) => console.log("Pre-defined all() error: ", err));

Promise.prototype
  .myAll([p1, p2, p3])
  .then((res) => console.log("Polyfill all() result: ", res))
  .catch((err) => console.log("Polyfill all() error: ", err));

console.log(`.........Promise allSettled() test...........`);

Promise.allSettled([p1, p2, p4]).then((res) =>
  console.log("Pre-defined allSettled() result: ", res),
);
Promise.prototype
  .myAllSettled([p1, p2, p4])
  .then((res) => console.log("Polyfill allSettled() result: ", res));

console.log(`.........Promise race() test...........`);
Promise.race([p4, p2])
  .then((res) => console.log("Pre-defined race() result: ", res))
  .catch((error) => console.log("Pre-defined race() error: ", error));
Promise.prototype
  .myRace([p4, p1])
  .then((res) => console.log("Polyfill race() result: ", res))
  .catch((error) => console.log("Polyfill race() error: ", error));

console.log(`.........Promise any() test...........`);
Promise.any([p4, p6, p1])
  .then((res) => console.log("Pre-defined any() result: ", res))
  .catch((error) => console.log("Pre-defined any() error: ", error));
Promise.prototype
  .myAny([p4, p6, p1])
  .then((res) => console.log("Polyfill any() result: ", res))
  .catch((error) => console.log("Polyfill any() error: ", error));
