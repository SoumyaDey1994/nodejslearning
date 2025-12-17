/**
 * In async-await, if there are more than 1 promises awaiting tobe resolved then,
 * If the first promise took more time than others,
 * then JS program will be suspened till the time first promise returns & resumes execution from that point.
 * Even though the other promises are already resolved, program will still wait for the first promise to return
 *
 * In contrary, if first promise resolved first, then JS will proces that result first
 * and then again suspend execution till other promises results tobe available.
 * Once they arrive, then the program execution will resume from that point.
 *
 * In-case of errors, the catch block will caught error of first promise
 * If subsequent promises gets rejected, then it will be treated as UnhandledPromiseRejection by JS env
 */
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("P1 resolved"), 30000);
  // setTimeout(() => reject('P1 rejected'), 5000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("P2 resolved"), 20000);
  // setTimeout(() => reject("P2 rejected"), 10000);
});

async function handlePromise() {
  console.log(`Promise Execution starts`);

  try {
    const startTime = Date.now();
    const p1Result = await p1;
    console.log(p1Result);

    const p2Result = await p2;
    console.log(p2Result);

    const endTime = Date.now();
    console.log(`Promise Execution ends`);
    console.log(`Time elapsed: ${Math.ceil((endTime - startTime) / 1000)} sec`);
  } catch (err) {
    console.log(`Error occured: ${err}`);
  }
}

handlePromise();
