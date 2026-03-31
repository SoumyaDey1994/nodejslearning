/**
 * Implement Retry with exponential backoff
 */

function fetch(count) {
  return new Promise((resolve, reject) => {
    const random = Math.floor(Math.random() * 3);
    if(count === random) {
        resolve(`Success: ${count}`);
    } else {
        reject("Something went wrong");
    }
  });
}

function getDetails(fetch, delay, retryAttemps, count = 0) {
  setTimeout(async () => {
    try {
      const result = await fetch(count);
      console.log(`Result: ${result}`);
      return result;
    } catch (err) {
      console.log(`Error in getting result: ${err}`);
      if (count < retryAttemps) {
        count = count + 1;
        delay = delay * 2;
        console.log(`Attempt: ${count}, Retrying after ${delay} ms`);
        getDetails(fetch, delay, retryAttemps, count);
      } else {
        console.log(`Retry attempts exhausted, pls try later`);
      }
    }
  }, delay);
}

getDetails(fetch, 1000, 3);
