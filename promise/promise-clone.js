class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.handlers = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = value;
      this.handlers.forEach((h) => h.onFulfilled(value));
    };

    const reject = (error) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.value = error;
      this.handlers.forEach((h) => h.onRejected(error));
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handle = () => {
        try {
          if (this.state === "fulfilled") {
            const result = onFulfilled ? onFulfilled(this.value) : this.value;
            resolve(result);
          } else if (this.state === "rejected") {
            const result = onRejected ? onRejected(this.value) : this.value;
            reject(result);
          } else {
            this.handlers.push({
              onFulfilled: (val) => {
                try {
                  const result = onFulfilled ? onFulfilled(val) : val;
                  resolve(result);
                } catch (e) {
                  reject(e);
                }
              },
              onRejected: (err) => {
                try {
                  const result = onRejected ? onRejected(err) : err;
                  reject(result);
                } catch (e) {
                  reject(e);
                }
              },
            });
          }
        } catch (err) {
          reject(err);
        }
      };

      setTimeout(handle, 0); // mimic async behavior
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // static helpers
  static resolve(val) {
    return new MyPromise((res) => res(val));
  }

  static reject(err) {
    return new MyPromise((_, rej) => rej(err));
  }
}

// Execution
MyPromise.resolve(5)
  .then((x) => x * 2)
  .then((x) => {
    console.log(x); // 10
    throw "error!";
  })
  .catch((err) => console.log(err)); // error!
