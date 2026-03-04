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

Promise.prototype.myRace = (pr) => {
  return new Promise((resolve, reject) => {
    pr.forEach((pm) => Promise.resolve(pm).then(resolve).catch(reject));
  });
};

Promise.prototype.myAny = (pr) => {
  return new Promise((resolve, reject) => {
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
