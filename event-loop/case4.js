const fs = require("fs");

setImmediate(() => console.log("setImmediate"));

setTimeout(() => console.log("Timer expired"), 0);

Promise.resolve("Promise").then(console.log);

fs.readFile('./file.txt', 'utf8', (err, data) => {
    console.log("File Read Complete");
})


process.nextTick(() => {
    process.nextTick(() => console.log("Inner nextTick"));
    console.log("nextTick");
})

console.log("End of Program");

/**
 * Expected O/P
 * 
 * End of Program
 * nextTick
 * Promise
 * Timer expired
 * Inner nextTick
 * setImmediate
 * File Read Complete
 */