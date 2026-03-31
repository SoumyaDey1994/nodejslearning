/**
 * Implement Retry with exponential backoff
 * without recurion
 */

function fetch(count) {
  return new Promise((resolve, reject) => {
    const random = Math.floor(Math.random() * 5);
    if (count === random) {
      resolve(count);
    } else {
      reject(`Something went wrong`);
    }
  });
}

function sleep(interval) {
  return new Promise((resolve, reject) => setTimeout(resolve, interval));
}

async function getDetails(fetch, delay, retryAttemps) {
  for (let i = 0; i <= retryAttemps; i++) {
    try {
      const data = await fetch(i);
      console.log(`Fetched data successfully: ${data}`);
      return data;
    } catch (err) {
      console.log(`Error in Fetching: ${err}`);
      if (i === retryAttemps) {
        console.log(`All Retry Attempst exhausted`);
        break;
      }

      delay = delay * 2;
      console.log(`Retry attempt: ${i + 1}, after delay: ${delay}ms`);
      await sleep(delay);
    }
  }
}

getDetails(fetch, 200, 5);
